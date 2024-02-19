import { Module } from '@nestjs/common';
import { WellnessScoresService } from './wellness-scores.service';
import { WellnessScoresController } from './wellness-scores.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [WellnessScoresController],
  providers: [WellnessScoresService],
})
export class WellnessScoresModule {}
