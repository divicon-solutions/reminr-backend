import {
  CreateCallbackRequestDto,
  CallbackRequestDto,
  PrismaService,
  UpdateCallbackRequestDto,
  User,
} from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CallbackRequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCallbackRequestDto: CreateCallbackRequestDto, user: User) {
    const result = await this.prisma.getClient(user).callbackRequest.create({
      data: {
        ...createCallbackRequestDto,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return plainToInstance(CallbackRequestDto, result);
  }

  async findAll(user: User) {
    const result = await this.prisma.getClient(user).callbackRequest.findMany();
    return plainToInstance(CallbackRequestDto, result);
  }

  async findOne(id: string, user: User) {
    const result = await this.prisma
      .getClient(user)
      .callbackRequest.findUnique({
        where: {
          id,
        },
      });
    return plainToInstance(CallbackRequestDto, result);
  }

  async update(
    id: string,
    updateCallbackRequestDto: UpdateCallbackRequestDto,
    user: User,
  ) {
    const result = await this.prisma.getClient(user).callbackRequest.update({
      where: {
        id,
      },
      data: updateCallbackRequestDto,
    });
    return plainToInstance(CallbackRequestDto, result);
  }

  async remove(id: string, user: User) {
    const result = await this.prisma.getClient(user).callbackRequest.delete({
      where: {
        id,
      },
    });
    return plainToInstance(CallbackRequestDto, result);
  }
}
