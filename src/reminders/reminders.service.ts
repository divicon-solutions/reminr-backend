import { NotificationsService } from '@app/notifications/notifications.service';
import {
  CreateReminderDto,
  PrismaService,
  UpdateReminderDto,
  User,
  Reminder,
} from '@app/prisma';
import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import * as moment from 'moment-timezone';

@Injectable()
export class RemindersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  private readonly logger = new Logger(RemindersService.name);

  async create(createReminderDto: CreateReminderDto, user: User) {
    const result = await this.prisma.getClient(user).reminder.create({
      data: createReminderDto,
      include: { medication: true },
    });
    return plainToInstance(Reminder, result);
  }

  async findAll(user: User) {
    const result = await this.prisma
      .getClient(user)
      .reminder.findMany({ include: { medication: true } });
    return plainToInstance(Reminder, result);
  }

  async findOne(id: string, user: User) {
    const result = await this.prisma.getClient(user).reminder.findUnique({
      where: {
        id,
      },
      include: { medication: true },
    });
    return plainToInstance(Reminder, result);
  }

  async update(id: string, updateReminderDto: UpdateReminderDto, user: User) {
    const result = await this.prisma.getClient(user).reminder.update({
      where: {
        id,
      },
      data: updateReminderDto,
      include: { medication: true },
    });
    return plainToInstance(Reminder, result);
  }

  async remove(id: string, user: User) {
    const result = await this.prisma.getClient(user).reminder.delete({
      where: {
        id,
      },
    });
    return result;
  }

  async makeReminders(timezone: string) {
    const now = moment().tz(timezone).format('YYYY-MM-DD');
    this.logger.log(`Creating reminders for ${now}`);
    const medications = await this.prisma.medication.findMany({
      where: {
        startDate: { lte: now + 'T00:00:00.000Z' },
      },
    });
    this.logger.log(`Found ${medications.length} medications`);
    const { count } = await this.prisma.reminder.createMany({
      data: medications.map((medication) => {
        const remindAt = moment().tz(timezone);
        const medicationTime = moment(medication.time).utc();
        remindAt.set({
          hours: medicationTime.hours(),
          minutes: medicationTime.minutes(),
          seconds: 0,
        });
        this.logger.log(`Creating reminder for ${remindAt.toDate()}`);

        return {
          medicationId: medication.id,
          remindAt: remindAt.toDate(),
          title: `Take ${medication.name}`,
        };
      }),
    });
    this.logger.log(`Created ${count} reminders`);
    const syncResult = await Promise.allSettled(
      medications.map((medication) =>
        this.notificationsService.sendPushNotification(
          {
            body: `Take ${medication.name}`,
            data: { medicationId: medication.id },
            title: 'Medication reminder',
            userId: medication.userId,
          },
          true,
        ),
      ),
    );
    this.logger.log(
      `Sent ${syncResult.filter((r) => r.status === 'fulfilled').length} push notifications`,
    );
    this.logger.log(
      `Failed to send ${syncResult.filter((r) => r.status === 'rejected').length} push notifications`,
    );
    this.logger.log('Finished creating reminders');
  }
}
