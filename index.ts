import { NestFactory } from '@nestjs/core';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { logger } from 'firebase-functions';
import { AppModule } from './src/app.module';
import * as admin from 'firebase-admin';
import * as serviceAccountKey from './src/config/serviceAccountKey.json';
import { RemindersService } from '@app/reminders/reminders.service';
import * as winston from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';

function initializeFirebase() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(
        serviceAccountKey as admin.ServiceAccount,
      ),
      storageBucket: `gs://${serviceAccountKey.project_id}.appspot.com`,
    });
    logger.log('Firebase initialized');
  } else {
    logger.log('Firebase already initialized');
  }
}

initializeFirebase();

async function getNestApp() {
  const instance = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('Schedular', {
            colors: false,
            prettyPrint: true,
          }),
        ),
      }),
    ],
  });
  return await NestFactory.createApplicationContext(AppModule, {
    logger: WinstonModule.createLogger({
      instance,
    }),
  });
}

export const scheduleReminders = onSchedule(
  {
    schedule: 'every day 00:00',
    timeZone: 'America/New_York',
  },
  async () => {
    try {
      const app = await getNestApp();
      const remindersService = app.get(RemindersService);
      logger.log('Running scheduled reminders');
      await remindersService.makeReminders('America/New_York');
      logger.log('Scheduled reminders complete');
      await app.close();
    } catch (error) {
      logger.error('Error running scheduled reminders', error);
    }
  },
);
