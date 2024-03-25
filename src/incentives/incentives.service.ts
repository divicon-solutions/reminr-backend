import {
  CreateIncentiveDto,
  IncentiveDto,
  PrismaService,
  UpdateIncentiveDto,
  User,
} from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class IncentivesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createIncentiveDto: CreateIncentiveDto, user: User) {
    const { userId, ...rest } = createIncentiveDto;
    const result = await this.prisma.getClient(user).incentive.create({
      data: {
        ...rest,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return plainToInstance(IncentiveDto, result);
  }

  async findAll(user: User, userId?: string) {
    const result = await this.prisma.getClient(user).incentive.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return plainToInstance(IncentiveDto, result);
  }

  async findOne(id: string, user: User) {
    const result = await this.prisma.getClient(user).incentive.findUnique({
      where: {
        id,
      },
    });
    return plainToInstance(IncentiveDto, result);
  }

  async update(id: string, updateIncentiveDto: UpdateIncentiveDto, user: User) {
    const result = await this.prisma.getClient(user).incentive.update({
      where: {
        id,
      },
      data: updateIncentiveDto,
    });
    return plainToInstance(IncentiveDto, result);
  }

  async remove(id: string, user: User) {
    const result = await this.prisma.getClient(user).incentive.delete({
      where: {
        id,
      },
    });
    return plainToInstance(IncentiveDto, result);
  }
}
