import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { PrismaModule } from '@app/prisma';
import { RemindersModule } from '@app/reminders/reminders.module';

@Module({
  imports: [PrismaModule, RemindersModule],
  controllers: [MedicationsController],
  providers: [MedicationsService],
})
export class MedicationsModule {}
