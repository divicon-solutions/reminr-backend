import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import configuration from './config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './shared';
import { MedicationsModule } from './medications/medications.module';
import { InrTestModule } from './inr-test/inr-test.module';
import { RemindersModule } from './reminders/reminders.module';
import { WellnessScoresModule } from './wellness-scores/wellness-scores.module';
import { IncentivesModule } from './incentives/incentives.module';
import { RedeemsModule } from './redeems/redeems.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    UsersModule,
    SharedModule,
    MedicationsModule,
    InrTestModule,
    RemindersModule,
    WellnessScoresModule,
    IncentivesModule,
    RedeemsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
