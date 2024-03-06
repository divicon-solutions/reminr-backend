import {
  CreateNotificationDto,
  NotificationDto,
  PrismaService,
  User,
} from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { messaging } from 'firebase-admin';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto, user: User) {
    const { userId, ...rest } = createNotificationDto;
    const result = await this.prisma.getClient(user).notification.create({
      data: {
        ...rest,
        user: { connect: { id: userId } },
      },
    });
    this.sendPushNotification(result);
    return plainToInstance(NotificationDto, result);
  }

  async findAll(user: User) {
    const result = await this.prisma.getClient(user).notification.findMany({
      where: { userId: user.id },
    });
    return plainToInstance(NotificationDto, result);
  }

  async sendPushNotification(notification: NotificationDto) {
    const result = await this.prisma.pushToken.findMany({
      where: { userId: notification.userId },
      select: { token: true },
    });
    const tokens = [...new Set(result.map((r) => r.token))];
    if (tokens.length === 0) {
      return;
    }
    const promises = tokens.map((token) => {
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
      return messaging().send(payload);
    });
    return Promise.all(promises);
  }
}
