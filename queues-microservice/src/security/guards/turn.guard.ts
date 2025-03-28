import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class TurnGuard implements CanActivate {

  constructor(private readonly jwt: JwtService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const payload = this.jwt.verify(token);
      request.turn = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
}
