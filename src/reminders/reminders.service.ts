import { NotificationsService } from '@app/notifications/notifications.service';
import {
  CreateReminderDto,
  PrismaService,
  UpdateReminderDto,
  User,
  Reminder,
  Medication,
} from '@app/prisma';
import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
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

  async createReminder(medication: Medication, user: User) {
    try {
      const timezone = 'America/New_York';
      const endOfDay = moment().tz(timezone).endOf('day');
      const startDate = moment(medication.startDate).utc().tz(timezone, true);
      // if medication start date is in the future, don't create reminders
      if (startDate.isAfter(endOfDay)) {
        this.logger.log('Medication start date is in the future');
        return;
      }
      this.logger.log('Creating reminder');
      const remindAt = moment().tz(timezone);
      const medicationTime = moment(medication.time).utc();
      remindAt.set({
        hours: medicationTime.hours(),
        minutes: medicationTime.minutes(),
        seconds: 0,
        milliseconds: 0,
      });
      if (remindAt.isBefore(moment().tz(timezone))) {
        this.logger.log('Cannot create reminders for the past');
        return;
      }
      this.logger.log(`Creating reminder for ${remindAt.toDate()}`);
      const count = await this.prisma.getClient(user).reminder.count({
        where: {
          medicationId: medication.id,
          remindAt: remindAt.toDate(),
        },
      });
      if (count > 0) {
        throw new UnprocessableEntityException('Reminder already exists');
      }
      const result = await this.prisma.getClient(user).reminder.create({
        data: {
          medicationId: medication.id,
          remindAt: remindAt.toDate(),
          title: `Take ${medication.name}`,
        },
      });
      this.logger.log(`Created reminder ${result.id}`);
      await this.notificationsService.sendPushNotification(
        {
          body: `Take ${medication.name}`,
          data: { medicationId: medication.id, type: 'SCHEDULE_REMINDERS' },
          title: 'Medication reminder',
          userId: medication.userId,
        },
        true,
      );
      this.logger.log('Sent push notification');
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateReminder(medication: Medication, user: User) {
    try {
      const deletedCount = await this.prisma
        .getClient(user)
        .reminder.deleteMany({
          where: {
            medicationId: medication.id,
            remindAt: {
              gte: moment().startOf('day').toDate(),
            },
          },
        });
      this.logger.log(`Deleted ${deletedCount.count} reminders`);
      await this.createReminder(medication, user);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findAll(user: User, date: Date) {
    const timezone = 'America/New_York';
    const startOfDay = moment(date).tz(timezone).startOf('day').toDate();
    const endOfDay = moment(date).tz(timezone).endOf('day').toDate();
    const result = await this.prisma.getClient(user).reminder.findMany({
      where: {
        remindAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: { medication: true },
    });
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
          milliseconds: 0,
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
            data: { medicationId: medication.id, type: 'SCHEDULE_REMINDERS' },
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
