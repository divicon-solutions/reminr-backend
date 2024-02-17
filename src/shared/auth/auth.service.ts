import { PrismaService } from '@app/prisma';
import { Injectable, Logger } from '@nestjs/common';
import { auth } from 'firebase-admin';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly prisma: PrismaService) {}

  async validateToken(token: string) {
    try {
      const decodedToken = await auth().verifyIdToken(token);
      const { uid: id } = decodedToken;
      const user = await this.prisma.user.findUnique({ where: { id } });
      return user;
    } catch (error) {
      this.logger.error(error.message);
      return null;
    }
  }
}
