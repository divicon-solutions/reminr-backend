import { Module } from '@nestjs/common';
import { RedeemsService } from './redeems.service';
import { RedeemsController } from './redeems.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [RedeemsController],
  providers: [RedeemsService],
})
export class RedeemsModule {}
