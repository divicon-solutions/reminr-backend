import { Module } from '@nestjs/common';
import { InrTestService } from './inr-test.service';
import { InrTestController } from './inr-test.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [InrTestController],
  providers: [InrTestService],
})
export class InrTestModule {}
