import {
  CreateRedeemDto,
  RedeemDto,
  PrismaService,
  UpdateRedeemDto,
  User,
} from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RedeemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRedeemDto: CreateRedeemDto, user: User) {
    const result = await this.prisma.getClient(user).redeem.create({
      data: {
        ...createRedeemDto,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return plainToInstance(RedeemDto, result);
  }

  async findAll(user: User) {
    const result = await this.prisma.getClient(user).redeem.findMany();
    return plainToInstance(RedeemDto, result);
  }

  async findOne(id: string, user: User) {
    const result = await this.prisma.getClient(user).redeem.findUnique({
      where: {
        id,
      },
    });
    return plainToInstance(RedeemDto, result);
  }

  async update(id: string, updateRedeemDto: UpdateRedeemDto, user: User) {
    const result = await this.prisma.getClient(user).redeem.update({
      where: {
        id,
      },
      data: updateRedeemDto,
    });
    return plainToInstance(RedeemDto, result);
  }

  async remove(id: string, user: User) {
    const result = await this.prisma.getClient(user).redeem.delete({
      where: {
        id,
      },
    });
    return plainToInstance(RedeemDto, result);
  }
}
