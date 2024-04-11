import { PrismaService, User } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateMedicationDto, MedicationDto, UpdateMedicationDto } from './dto';
import { RemindersService } from '@app/reminders/reminders.service';

@Injectable()
export class MedicationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly remindersService: RemindersService,
  ) {}

  async create(createMedicationDto: CreateMedicationDto, user: User) {
    const { userId, ...rest } = createMedicationDto;
    const result = await this.prisma.getClient(user).medication.create({
      data: {
        ...rest,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    await this.remindersService.createReminder(result, user);
    return plainToInstance(MedicationDto, result);
  }

  async findAll(user: User, userId?: string) {
    const result = await this.prisma.getClient(user).medication.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return plainToInstance(MedicationDto, result);
  }

  async findOne(id: string, user: User) {
    const result = await this.prisma.getClient(user).medication.findUnique({
      where: {
        id,
      },
    });
    return plainToInstance(MedicationDto, result);
  }

  async update(
    id: string,
    updateMedicationDto: UpdateMedicationDto,
    user: User,
  ) {
    const result = await this.prisma.getClient(user).medication.update({
      where: {
        id,
      },
      data: updateMedicationDto,
    });
    await this.remindersService.updateReminder(result, user);
    return plainToInstance(MedicationDto, result);
  }

  async remove(id: string, user: User) {
    const result = await this.prisma.getClient(user).medication.delete({
      where: {
        id,
      },
    });
    return plainToInstance(MedicationDto, result);
  }
}
