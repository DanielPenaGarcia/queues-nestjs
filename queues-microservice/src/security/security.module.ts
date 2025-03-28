import { Module } from '@nestjs/common';
import { ApiGuardProvider } from './providers/api-guard.provider';

@Module({
    providers: [ApiGuardProvider],
})
export class SecurityModule {}
