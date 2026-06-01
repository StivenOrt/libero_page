import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Private } from '../decorators/jwt.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPrivate = this.reflector.getAllAndOverride<boolean>(Private, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isPrivate) return true;

    return super.canActivate(context);
  }
}