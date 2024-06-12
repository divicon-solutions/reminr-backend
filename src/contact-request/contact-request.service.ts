import {
  CreateContactRequestDto,
  ContactRequestDto,
  PrismaService,
  UpdateContactRequestDto,
  User,
} from '@app/prisma';
import { EmailService } from '@app/shared/email/email.service';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ContactRequestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(createContactRequestDto: CreateContactRequestDto) {
    const result = await this.prisma.contactRequest.create({
      data: createContactRequestDto,
    });
    await this.sendEmail(result);
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

  private async sendEmail(contactRequest: ContactRequestDto) {
    const data = {
      subject: 'New Contact Request Received',
      html: `<h1>New Contact Request</h1>
      <p>Name: ${contactRequest.firstName} ${contactRequest.lastName}</p>
      <p>Email: ${contactRequest.email}</p>
      <p>Phone: ${contactRequest.phoneNumber}</p>
      <p>Message: ${contactRequest.message}</p>`,
      text: `New Contact Request\nName: ${contactRequest.firstName} ${contactRequest.lastName}\nEmail: ${contactRequest.email}\nMessage: ${contactRequest.message}`,
    };
    return this.emailService.sendEmail(data);
  }
}
