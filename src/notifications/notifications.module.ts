import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { PushTokensModule } from './push-tokens/push-tokens.module';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PushTokensModule, PrismaModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
