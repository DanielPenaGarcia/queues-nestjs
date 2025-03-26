import { Global, Module } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { QueuesController } from './queues.controller';
import { EntitiesModule } from '../entities/entities.module';
import { BullConnectionProvider } from '../utils/providers/redis.provider';

@Global()
@Module({
  imports: [EntitiesModule],
  controllers: [QueuesController],
  providers: [QueuesService, BullConnectionProvider],
  exports: [QueuesService],
})
export class QueuesModule {}
