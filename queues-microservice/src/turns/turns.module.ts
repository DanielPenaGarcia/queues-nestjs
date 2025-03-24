import { Module } from '@nestjs/common';
import { TurnsService } from './turns.service';
import { TurnsController } from './turns.controller';
import { BullConnectionProvider } from '../utils/providers/redis.provider';
import { EntitiesModule } from '../entities/entities.module';

@Module({
  imports: [EntitiesModule],
  controllers: [TurnsController],
  providers: [TurnsService, BullConnectionProvider],
})
export class TurnsModule {}
