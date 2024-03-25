import {
  CreateRedeemDto,
  RedeemDto,
  PrismaService,
  UpdateRedeemDto,
  User,
} from '@app/prisma';
import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RedeemsService {
  private readonly logger = new Logger(RedeemsService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create(createRedeemDto: CreateRedeemDto, user: User) {
    const { userId, ...rest } = createRedeemDto;
    const result = await this.prisma
      .getClient(user)
      .$transaction(async (tx) => {
        let amountToSubtract = createRedeemDto.amount;
        if (amountToSubtract <= 0) {
          this.logger.error('Amount should be greater than 0');
          throw new UnprocessableEntityException(
            'Amount should be greater than 0',
          );
        }
        if (amountToSubtract % 5 !== 0) {
          this.logger.error('Amount should be multiple of 5');
          throw new UnprocessableEntityException(
            'Amount should be multiple of 5',
          );
        }
        const {
          _sum: { amount, redeemedAmount },
        } = await tx.incentive.aggregate({
          _sum: { amount: true, redeemedAmount: true },
          where: { isRedeemed: false },
        });
        const balance = amount - redeemedAmount;
        if (balance < amountToSubtract) {
          this.logger.error('Insufficient balance');
          throw new UnprocessableEntityException('Insufficient balance');
        }
        const incentives = await tx.incentive.findMany({
          where: { isRedeemed: false },
          orderBy: { createdAt: 'asc' },
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
        this.logger.log('Total balance:', balance);
        this.logger.log('Amount to subtract:', amountToSubtract);
        for await (const incentive of incentives) {
          this.logger.log(
            'Incentive:',
            incentive.id,
            incentive.amount,
            incentive.redeemedAmount,
          );
          this.logger.log('Amount to subtract:', amountToSubtract);
          if (amountToSubtract <= 0) {
            return;
          }
          const remainingAmount = incentive.amount - incentive.redeemedAmount;
          this.logger.log(
            'Subtracting:',
            amountToSubtract,
            'from',
            remainingAmount,
            'of',
            incentive.id,
          );
          if (remainingAmount <= amountToSubtract) {
            this.logger.log('Redeemed fully:', incentive.id);
            await tx.incentive.update({
              where: {
                id: incentive.id,
              },
              data: {
                isRedeemed: true,
                redeemedAmount: remainingAmount,
              },
            });
            amountToSubtract -= remainingAmount;
          } else {
            this.logger.log('Redeemed partially:', incentive.id);
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
        }
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
