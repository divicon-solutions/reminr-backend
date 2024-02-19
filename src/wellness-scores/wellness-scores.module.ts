import { Module } from '@nestjs/common';
import { WellnessScoresService } from './wellness-scores.service';
import { WellnessScoresController } from './wellness-scores.controller';

@Module({
  controllers: [WellnessScoresController],
  providers: [WellnessScoresService],
})
export class WellnessScoresModule {}
