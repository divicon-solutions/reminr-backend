import {
  CreateReminderDto,
  PrismaService,
  UpdateReminderDto,
  User,
  Reminder,
} from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RemindersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReminderDto: CreateReminderDto, user: User) {
    const result = await this.prisma.getClient(user).reminder.create({
      data: createReminderDto,
      include: { medication: true },
    });
    return plainToInstance(Reminder, result);
  }

  async findAll(user: User) {
    const result = await this.prisma
      .getClient(user)
      .reminder.findMany({ include: { medication: true } });
    return plainToInstance(Reminder, result);
  }

  async findOne(id: string, user: User) {
    const result = await this.prisma.getClient(user).reminder.findUnique({
      where: {
        id,
      },
      include: { medication: true },
    });
    return plainToInstance(Reminder, result);
  }

  async update(id: string, updateReminderDto: UpdateReminderDto, user: User) {
    const result = await this.prisma.getClient(user).reminder.update({
      where: {
        id,
      },
      data: updateReminderDto,
      include: { medication: true },
    });
    return plainToInstance(Reminder, result);
  }

  async remove(id: string, user: User) {
    const result = await this.prisma.getClient(user).reminder.delete({
      where: {
        id,
      },
    });
    return result;
  }
}
