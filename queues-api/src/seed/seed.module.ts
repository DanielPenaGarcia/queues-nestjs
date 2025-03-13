import { Module } from '@nestjs/common';
import { SeedController } from './controllers/seed.controller';
import { SeedService } from './services/seed.service';
import { EntitiesModule } from '@entities/entities.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [EntitiesModule, AuthModule],
  controllers: [SeedController],
  providers: [SeedService]
})
export class SeedModule {}
