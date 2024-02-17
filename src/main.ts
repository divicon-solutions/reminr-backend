import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  app.setGlobalPrefix('api/v1');

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const config = new DocumentBuilder()
    .setTitle('RemInr Api')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/docs', app, document, {
    jsonDocumentUrl: '/api/v1/docs/swagger.json',
    swaggerOptions: {
      url: '/api/v1/docs/swagger.json',
      displayRequestDuration: true,
    },
  });

  app.enableCors({ origin: '*' });

  const port = configService.get<number>('port');
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
