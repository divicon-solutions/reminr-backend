import { Module } from '@nestjs/common';
import { GiftCardTypeService } from './gift-card-type.service';
import { GiftCardTypeController } from './gift-card-type.controller';
import { SharedModule } from '@app/shared';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [SharedModule, PrismaModule],
  controllers: [GiftCardTypeController],
  providers: [GiftCardTypeService],
})
export class GiftCardTypeModule {}
