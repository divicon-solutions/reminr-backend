import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import * as serviceAccountKey from './config/serviceAccountKey.json';
import { CursorPaginatedDto, PaginatedDto, SuccessResponseDto } from './shared';
import * as winston from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';

function initializeFirebase() {
  const logger = new Logger('Firebase');
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

async function bootstrap() {
  const instance = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('Api', {
            colors: false,
            prettyPrint: true,
          }),
        ),
      }),
    ],
  });
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance,
    }),
  });
  const logger = new Logger('Main');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const config = new DocumentBuilder()
    .setTitle('RemInr Api')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [SuccessResponseDto, CursorPaginatedDto, PaginatedDto],
  });
  SwaggerModule.setup('/v1/docs', app, document, {
    jsonDocumentUrl: '/v1/docs/swagger.json',
    swaggerOptions: {
      url: '/v1/docs/swagger.json',
      displayRequestDuration: true,
    },
  });

  app.enableCors({ origin: '*' });

  const port = configService.get<number>('port');
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

initializeFirebase();
bootstrap().catch((err) => console.error(err));
