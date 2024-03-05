import {
  CreateContactRequestDto,
  ContactRequestDto,
  PrismaService,
  UpdateContactRequestDto,
  User,
} from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ContactRequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContactRequestDto: CreateContactRequestDto) {
    const result = await this.prisma.contactRequest.create({
      data: createContactRequestDto,
    });
    return plainToInstance(ContactRequestDto, result);
  }

  async findAll(user: User) {
    const result = await this.prisma.getClient(user).contactRequest.findMany();
    return plainToInstance(ContactRequestDto, result);
  }

  async findOne(id: string, user: User) {
    const result = await this.prisma.getClient(user).contactRequest.findUnique({
      where: {
        id,
      },
    });
    return plainToInstance(ContactRequestDto, result);
  }

  async update(
    id: string,
    updateContactRequestDto: UpdateContactRequestDto,
    user: User,
  ) {
    const result = await this.prisma.getClient(user).contactRequest.update({
      where: {
        id,
      },
      data: updateContactRequestDto,
    });
    return plainToInstance(ContactRequestDto, result);
  }

  async remove(id: string, user: User) {
    const result = await this.prisma.getClient(user).contactRequest.delete({
      where: {
        id,
      },
    });
    return plainToInstance(ContactRequestDto, result);
  }
}
