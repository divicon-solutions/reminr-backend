import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { PushTokensModule } from './push-tokens/push-tokens.module';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [PushTokensModule],
})
export class NotificationsModule {}
