import { Injectable, Logger } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { enhance } from '@zenstackhq/runtime';
import { SoftDeleteMiddleware } from './middleware';

@Injectable()
export class PrismaService extends PrismaClient<
  Prisma.PrismaClientOptions,
  'query'
> {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({ log: ['info'] });

    this.logger.log(`Prisma v${Prisma.prismaVersion.client}`);
    this.$use(SoftDeleteMiddleware());
  }

  getClient(user?: User) {
    return enhance(this, { user }, { logPrismaQuery: true });
  }
}
