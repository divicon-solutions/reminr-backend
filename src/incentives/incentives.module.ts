import { Module } from '@nestjs/common';
import { IncentivesService } from './incentives.service';
import { IncentivesController } from './incentives.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [IncentivesController],
  providers: [IncentivesService],
})
export class IncentivesModule {}
