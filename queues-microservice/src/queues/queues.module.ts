import { Module } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { QueuesController } from './queues.controller';
import { EntitiesModule } from '../entities/entities.module';
import { BullConnectionProvider } from '../utils/providers/redis.provider';

@Module({
  imports: [EntitiesModule],
  controllers: [QueuesController],
  providers: [QueuesService, BullConnectionProvider],
})
export class QueuesModule {}
