import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { environment } from '../../configurations/environment.config';

@Injectable()
export class ApiGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    if (!apiKey) {
      throw new ForbiddenException('API key is missing');
    }
    const apiKeyEnv = environment.api.key;
    if (apiKey !== apiKeyEnv) {
      throw new ForbiddenException('Invalid API key');
    }
    return true;
  }
}
