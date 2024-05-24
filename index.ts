import { NestFactory } from '@nestjs/core';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { logger } from 'firebase-functions';
import { AppModule } from './src/app.module';
import * as admin from 'firebase-admin';
import * as serviceAccountKey from './src/config/serviceAccountKey.json';
import { RemindersService } from '@app/reminders/reminders.service';

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
  return await NestFactory.createApplicationContext(AppModule);
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
