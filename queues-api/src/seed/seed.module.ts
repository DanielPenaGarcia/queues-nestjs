import { Module } from '@nestjs/common';
import { SeedController } from './controllers/seed.controller';
import { SeedService } from './services/seed.service';
import { EntitiesModule } from '@entities/entities.module';

@Module({
  imports: [EntitiesModule],
  controllers: [SeedController],
  providers: [SeedService]
})
export class SeedModule {}
