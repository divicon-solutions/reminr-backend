import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) {
      return false;
    }

    const user = await this.authService.validateToken(token);
    if (!user) {
      return false;
    }

    request.user = user;
    return true;
  }

  private extractToken(request: Request) {
    const authHeader = request.headers['authorization'];
    return authHeader?.split('Bearer ').pop();
  }
}
