import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard, AuthService } from './auth';
import { EmailService } from './email/email.service';

@Module({
  imports: [ConfigModule, PrismaModule],
  providers: [AuthGuard, AuthService, EmailService],
  exports: [AuthGuard, AuthService, EmailService],
})
export class SharedModule {}
