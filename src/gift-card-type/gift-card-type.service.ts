import {
  CreateGiftCardTypeDto,
  GiftCardTypeDto,
  PrismaService,
  UpdateGiftCardTypeDto,
  User,
} from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GiftCardTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGiftCardTypeDto: CreateGiftCardTypeDto, user: User) {
    const result = await this.prisma.getClient(user).giftCardType.create({
      data: createGiftCardTypeDto,
    });
    return plainToInstance(GiftCardTypeDto, result);
  }

  async findAll(user: User) {
    const result = await this.prisma.getClient(user).giftCardType.findMany();
    return plainToInstance(GiftCardTypeDto, result);
  }

  async findOne(id: string, user: User) {
    const result = await this.prisma.getClient(user).giftCardType.findUnique({
      where: {
        id,
      },
    });
    return plainToInstance(GiftCardTypeDto, result);
  }

  async update(
    id: string,
    updateGiftCardTypeDto: UpdateGiftCardTypeDto,
    user: User,
  ) {
    const result = await this.prisma.getClient(user).giftCardType.update({
      where: {
        id,
      },
      data: updateGiftCardTypeDto,
    });
    return plainToInstance(GiftCardTypeDto, result);
  }

  async remove(id: string, user: User) {
    const result = await this.prisma.getClient(user).giftCardType.delete({
      where: {
        id,
      },
    });
    return plainToInstance(GiftCardTypeDto, result);
  }
}
