import { MedicationDto, PrismaService, User } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { DashboardDataDto } from './dto/dashboard-data.dto';
import { AdminDashboardDataDto } from './dto/admin-dashboard-data.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardData(user: User) {
    const { score: wellnessScore } = (await this.prisma
      .getClient(user)
      .wellnessScore.findFirst({
        orderBy: { date: 'desc' },
        select: { score: true },
      })) || { score: null };

    const { _sum } = await this.prisma.getClient(user).incentive.aggregate({
      _sum: { amount: true, redeemedAmount: true },
      where: { isRedeemed: false },
    });

    const takenMedications = await this.prisma
      .getClient(user)
      .reminder.findMany({
        where: { acknowledgedAt: { not: null }, status: true },
        select: {
          id: true,
          remindAt: true,
          acknowledgedAt: true,
        },
        orderBy: { remindAt: 'asc' },
      });

    const inrTests = await this.prisma.getClient(user).inrTest.findMany({
      select: { id: true, date: true, inrValue: true },
      orderBy: { date: 'asc' },
    });

    const result: DashboardDataDto = {
      incentiveAmount: _sum.amount - _sum.redeemedAmount,
      inrTests,
      takenMedications,
      wellnessScore,
    };
    return result;
  }

  async getAdminDashboardData(user: User) {
    const users = await this.prisma.getClient(user).user.findMany({
      where: { role: 'USER' },
      include: { medications: { include: { reminders: true } } },
    });
    return users.map((user) => {
      const takenMedications = user.medications
        .map((medication) => medication.reminders)
        .flat()
        .filter((reminder) => reminder.acknowledgedAt && reminder.status);
      const skippedMedications = user.medications
        .map((medication) => medication.reminders)
        .flat()
        .filter((reminder) => !reminder.acknowledgedAt || !reminder.status);
      return plainToInstance(AdminDashboardDataDto, {
        email: user.email,
        name: user.fullName,
        phone: user.phoneNumber,
        takenMedications: plainToInstance(MedicationDto, takenMedications),
        skippedMedications: plainToInstance(MedicationDto, skippedMedications),
      });
    });
  }
}
