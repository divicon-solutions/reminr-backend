import {
  CreateReminderDto,
  ReminderDto,
  PrismaService,
  UpdateReminderDto,
  User,
} from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RemindersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReminderDto: CreateReminderDto, user: User) {
    const result = await this.prisma.getClient(user).reminder.create({
      data: createReminderDto,
    });
    return plainToInstance(ReminderDto, result);
  }

  async findAll(user: User) {
    const result = await this.prisma.getClient(user).reminder.findMany();
    return plainToInstance(ReminderDto, result);
  }

  async findOne(id: string, user: User) {
    const result = await this.prisma.getClient(user).reminder.findUnique({
      where: {
        id,
      },
    });
    return plainToInstance(ReminderDto, result);
  }

  async update(id: string, updateReminderDto: UpdateReminderDto, user: User) {
    const result = await this.prisma.getClient(user).reminder.update({
      where: {
        id,
      },
      data: updateReminderDto,
    });
    return plainToInstance(ReminderDto, result);
  }

  async remove(id: string, user: User) {
    const result = await this.prisma.getClient(user).reminder.delete({
      where: {
        id,
      },
    });
    return plainToInstance(ReminderDto, result);
  }
}
