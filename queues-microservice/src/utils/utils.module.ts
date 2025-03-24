import { Module } from '@nestjs/common';
import { QueueSchedulingService } from './services/queue-scheduling.service';
import { ScheduleModule } from '@nestjs/schedule';
import { EntitiesModule } from '../entities/entities.module';
import { BullConnectionProvider } from './providers/redis.provider';

@Module({
  imports: [EntitiesModule, ScheduleModule.forRoot()],
  providers: [QueueSchedulingService, BullConnectionProvider],
  exports: [ScheduleModule],
})
export class UtilsModule {}
