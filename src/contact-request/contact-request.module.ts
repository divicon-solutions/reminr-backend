import { Module } from '@nestjs/common';
import { ContactRequestService } from './contact-request.service';
import { ContactRequestController } from './contact-request.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [ContactRequestController],
  providers: [ContactRequestService],
})
export class ContactRequestModule {}
