import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard, AuthService } from './auth';

@Module({
  imports: [ConfigModule, PrismaModule],
  providers: [AuthGuard, AuthService],
  exports: [AuthGuard, AuthService],
})
export class SharedModule {}
