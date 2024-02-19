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
    const result = await this.prisma.getClient(user).incentive.create({
      data: {
        ...createIncentiveDto,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return plainToInstance(IncentiveDto, result);
  }

  async findAll(user: User) {
    const result = await this.prisma.getClient(user).incentive.findMany();
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
