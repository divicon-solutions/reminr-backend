import { Module } from '@nestjs/common';
import { CallbackRequestService } from './callback-request.service';
import { CallbackRequestController } from './callback-request.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [CallbackRequestController],
  providers: [CallbackRequestService],
})
export class CallbackRequestModule {}
