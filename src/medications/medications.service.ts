import { PrismaService, User } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateMedicationDto, MedicationDto, UpdateMedicationDto } from './dto';

@Injectable()
export class MedicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMedicationDto: CreateMedicationDto, user: User) {
    const result = await this.prisma.getClient(user).medication.create({
      data: {
        ...createMedicationDto,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return plainToInstance(MedicationDto, result);
  }

  async findAll(user: User) {
    const result = await this.prisma.getClient(user).medication.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
    return plainToInstance(MedicationDto, result);
  }

  async findOne(id: string, user: User) {
    const result = await this.prisma.getClient(user).medication.findUnique({
      where: {
        id,
      },
    });
    return plainToInstance(MedicationDto, result);
  }

  async update(
    id: string,
    updateMedicationDto: UpdateMedicationDto,
    user: User,
  ) {
    const result = await this.prisma.getClient(user).medication.update({
      where: {
        id,
      },
      data: updateMedicationDto,
    });
    return plainToInstance(MedicationDto, result);
  }

  async remove(id: string, user: User) {
    const result = await this.prisma.getClient(user).medication.delete({
      where: {
        id,
      },
    });
    return plainToInstance(MedicationDto, result);
  }
}
