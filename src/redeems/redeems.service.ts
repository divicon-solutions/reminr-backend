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
    const { userId, ...rest } = createRedeemDto;
    const result = await this.prisma
      .getClient(user)
      .$transaction(async (tx) => {
        let amountToSubtract = createRedeemDto.amount;
        const {
          _sum: { amount, redeemedAmount },
        } = await tx.incentive.aggregate({
          _sum: { amount: true, redeemedAmount: true },
          where: { isRedeemed: false },
        });
        const balance = amount - redeemedAmount;

        if (balance < amountToSubtract) {
          throw new Error('Insufficient balance');
        }

        const incentives = await tx.incentive.findMany({
          where: { isRedeemed: false },
        });

        const redeem = await tx.redeem.create({
          data: {
            ...rest,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });

        await Promise.all(
          incentives.map(async (incentive) => {
            if (amountToSubtract <= 0) {
              return;
            }

            const remainingAmount = incentive.amount - incentive.redeemedAmount;
            if (remainingAmount <= amountToSubtract) {
              await tx.incentive.update({
                where: {
                  id: incentive.id,
                },
                data: {
                  isRedeemed: true,
                  redeemedAmount: incentive.amount,
                },
              });
              amountToSubtract -= remainingAmount;
            } else {
              await tx.incentive.update({
                where: {
                  id: incentive.id,
                },
                data: {
                  redeemedAmount: incentive.redeemedAmount + amountToSubtract,
                },
              });
              amountToSubtract = 0;
            }
            await tx.incentivesOnRedeems.create({
              data: {
                incentive: { connect: { id: incentive.id } },
                redeem: { connect: { id: redeem.id } },
              },
            });
          }),
        );

        return plainToInstance(RedeemDto, redeem);
      });
    return result;
  }

  async findAll(user: User, userId?: string) {
    const result = await this.prisma.getClient(user).redeem.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
    });
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
