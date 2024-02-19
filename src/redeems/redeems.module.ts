import { Module } from '@nestjs/common';
import { RedeemsService } from './redeems.service';
import { RedeemsController } from './redeems.controller';

@Module({
  controllers: [RedeemsController],
  providers: [RedeemsService],
})
export class RedeemsModule {}
