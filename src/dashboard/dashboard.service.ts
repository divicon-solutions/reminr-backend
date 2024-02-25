import { PrismaService, User } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { DashboardDataDto } from './dto/dashboard-data.dto';

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
          // medication: { select: { name: true, id: true } },
        },
        orderBy: { remindAt: 'asc' },
      });
    const inrTests = await this.prisma.getClient(user).inrTest.findMany({
      select: { id: true, date: true, inrValue: true },
      orderBy: { date: 'desc' },
    });

    const result: DashboardDataDto = {
      incentiveAmount: _sum.amount - _sum.redeemedAmount,
      inrTests,
      takenMedications,
      wellnessScore,
    };
    return result;
  }
}
