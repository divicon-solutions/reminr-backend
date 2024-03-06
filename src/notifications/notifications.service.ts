import {
  CreateNotificationDto,
  NotificationDto,
  PrismaService,
  User,
} from '@app/prisma';
import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { messaging } from 'firebase-admin';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(NotificationsService.name);

  async create(
    createNotificationDto: CreateNotificationDto,
    user: User,
    isSilent?: boolean,
  ) {
    const { userId, ...rest } = createNotificationDto;
    const result = await this.prisma.getClient(user).notification.create({
      data: {
        ...rest,
        user: { connect: { id: userId } },
      },
    });
    this.sendPushNotification(result, isSilent);
    return plainToInstance(NotificationDto, result);
  }

  async findAll(user: User) {
    const result = await this.prisma.getClient(user).notification.findMany({
      where: { userId: user.id },
    });
    return plainToInstance(NotificationDto, result);
  }

  async sendPushNotification(
    notification: Pick<NotificationDto, 'userId' | 'title' | 'body' | 'data'>,
    isSilent = false,
  ) {
    const result = await this.prisma.pushToken.findMany({
      where: { userId: notification.userId },
      select: { token: true },
    });
    const tokens = [...new Set(result.map((r) => r.token))];
    if (tokens.length === 0) {
      return;
    }
    const promises = tokens.map(async (token) => {
      try {
        if (isSilent) {
          const payload: messaging.Message = {
            token,
            data: {
              title: notification.title,
              body: notification.body,
              metadata: JSON.stringify(notification.data),
            },
            android: {
              priority: 'high',
            },
            apns: {
              headers: {
                'apns-priority': '10',
              },
            },
          };
          return await messaging().send(payload);
        }
        const payload: messaging.Message = {
          token,
          notification: {
            title: notification.title,
            body: notification.body,
          },
          android: {
            priority: 'high',
          },
          apns: {
            headers: {
              'apns-priority': '10',
            },
          },
        };
        return await messaging().send(payload);
      } catch (error) {
        this.logger.verbose(`Is silent: ${isSilent}`);
        this.logger.error(error);
        if (
          error?.errorInfo?.code ===
          'messaging/registration-token-not-registered'
        ) {
          this.logger.log('Token not registered, deleting');
          const result = await this.prisma.pushToken.deleteMany({
            where: { token, userId: notification.userId },
          });
          this.logger.log(`Deleted ${result.count} tokens`);
        }
      }
    });
    return Promise.all(promises);
  }
}
