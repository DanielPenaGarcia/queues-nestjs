import { BullMQConfig } from '@configurations/bull-mq.config';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { BUY_TICKET_QUEUE } from '@utils/constants/queue.constants';
import { BuyTicketService } from './services/buy-ticket.service';
import { QueuesService } from './services/queues.service';
import { RedisProvider } from './providers/redis-options.provider';

@Module({
    imports: [BullModule.forRoot(BullMQConfig), BullModule.registerQueue({ name: BUY_TICKET_QUEUE })],
    providers: [BuyTicketService, QueuesService, RedisProvider],
    exports: [BullModule, QueuesService]
})
export class QueuesModule { }
