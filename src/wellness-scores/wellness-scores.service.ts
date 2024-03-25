import {
  CreateWellnessScoreDto,
  WellnessScoreDto,
  PrismaService,
  UpdateWellnessScoreDto,
  User,
} from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class WellnessScoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWellnessScoreDto: CreateWellnessScoreDto, user: User) {
    const { userId, ...rest } = createWellnessScoreDto;
    const result = await this.prisma.getClient(user).wellnessScore.create({
      data: {
        ...rest,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return plainToInstance(WellnessScoreDto, result);
  }

  async findAll(user: User, userId?: string) {
    const result = await this.prisma.getClient(user).wellnessScore.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
    });
    return plainToInstance(WellnessScoreDto, result);
  }

  async findOne(id: string, user: User) {
    const result = await this.prisma.getClient(user).wellnessScore.findUnique({
      where: {
        id,
      },
    });
    return plainToInstance(WellnessScoreDto, result);
  }

  async update(
    id: string,
    updateWellnessScoreDto: UpdateWellnessScoreDto,
    user: User,
  ) {
    const result = await this.prisma.getClient(user).wellnessScore.update({
      where: {
        id,
      },
      data: updateWellnessScoreDto,
    });
    return plainToInstance(WellnessScoreDto, result);
  }

  async remove(id: string, user: User) {
    const result = await this.prisma.getClient(user).wellnessScore.delete({
      where: {
        id,
      },
    });
    return plainToInstance(WellnessScoreDto, result);
  }
}
