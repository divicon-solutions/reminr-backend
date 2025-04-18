import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import configuration from './config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, RequestLoggerMiddleware } from './shared';
import { MedicationsModule } from './medications/medications.module';
import { InrTestModule } from './inr-test/inr-test.module';
import { RemindersModule } from './reminders/reminders.module';
import { WellnessScoresModule } from './wellness-scores/wellness-scores.module';
import { IncentivesModule } from './incentives/incentives.module';
import { RedeemsModule } from './redeems/redeems.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UploadModule } from './upload/upload.module';
import { CallbackRequestModule } from './callback-request/callback-request.module';
import { ContactRequestModule } from './contact-request/contact-request.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GiftCardTypeModule } from './gift-card-type/gift-card-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    ScheduleModule.forRoot(),
    UsersModule,
    SharedModule,
    MedicationsModule,
    InrTestModule,
    RemindersModule,
    WellnessScoresModule,
    IncentivesModule,
    RedeemsModule,
    DashboardModule,
    UploadModule,
    CallbackRequestModule,
    ContactRequestModule,
    NotificationsModule,
    SharedModule,
    GiftCardTypeModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
