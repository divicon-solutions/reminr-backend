import {
  CreateInrTestDto,
  InrTestDto,
  PrismaService,
  UpdateInrTestDto,
  User,
} from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class InrTestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInrTestDto: CreateInrTestDto, user: User) {
    const result = await this.prisma.getClient(user).inrTest.create({
      data: {
        ...createInrTestDto,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return plainToInstance(InrTestDto, result);
  }

  async findAll(user: User) {
    const result = await this.prisma
      .getClient(user)
      .inrTest.findMany({ orderBy: { date: 'asc' } });
    return plainToInstance(InrTestDto, result);
  }

  async findOne(id: string, user: User) {
    const result = await this.prisma.getClient(user).inrTest.findUnique({
      where: {
        id,
      },
    });
    return plainToInstance(InrTestDto, result);
  }

  async update(id: string, updateInrTestDto: UpdateInrTestDto, user: User) {
    const result = await this.prisma.getClient(user).inrTest.update({
      where: {
        id,
      },
      data: updateInrTestDto,
    });
    return plainToInstance(InrTestDto, result);
  }

  async remove(id: string, user: User) {
    const result = await this.prisma.getClient(user).inrTest.delete({
      where: {
        id,
      },
    });
    return plainToInstance(InrTestDto, result);
  }
}
