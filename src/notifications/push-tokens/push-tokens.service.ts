import {
  CreatePushTokenDto,
  PrismaService,
  PushTokenDto,
  User,
} from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PushTokensService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPushTokenDto: CreatePushTokenDto, user: User) {
    const { userId, ...rest } = createPushTokenDto;
    const result = await this.prisma.getClient(user).pushToken.create({
      data: {
        user: { connect: { id: userId } },
        ...rest,
      },
    });
    return plainToInstance(PushTokenDto, result);
  }

  async unsubscribe(token: string, user: User) {
    return this.prisma.getClient(user).pushToken.deleteMany({
      where: { token, userId: user.id },
    });
  }
}
