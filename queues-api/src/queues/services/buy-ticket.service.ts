import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { BUY_TICKET_QUEUE } from '@utils/constants/queue.constants';
import { Queue } from 'bullmq';

@Injectable()
export class BuyTicketService {
    constructor(@InjectQueue(BUY_TICKET_QUEUE) private readonly buyTicketService: Queue) {}
}
