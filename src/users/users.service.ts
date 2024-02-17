import {
  CreateUserDto,
  PrismaService,
  UpdateUserDto,
  User,
  UserDto,
} from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.prisma.user.create({ data: createUserDto });
    return plainToInstance(UserDto, result);
  }

  async findAll(user: User) {
    const result = await this.prisma.getClient(user).user.findMany();
    return plainToInstance(UserDto, result);
  }

  async findOne(id: string, user: User) {
    const result = await this.prisma.getClient(user).user.findUnique({
      where: { id },
    });
    return plainToInstance(UserDto, result);
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: User) {
    const result = await this.prisma.getClient(user).user.update({
      where: { id },
      data: updateUserDto,
    });
    return plainToInstance(UserDto, result);
  }

  async remove(id: string, user: User) {
    return this.prisma.getClient(user).user.delete({ where: { id } });
  }
}
