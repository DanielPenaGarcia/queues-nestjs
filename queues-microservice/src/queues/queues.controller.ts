import { Body, Controller, Get, Post } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { RegisterQueueDTO } from './models/inputs/register-queue.model';
import { QueueDTO } from './models/queue.model';

@Controller('queues')
export class QueuesController {
  constructor(private readonly queuesService: QueuesService) {}

  @Post()
  async registerQueue(@Body() body: RegisterQueueDTO): Promise<QueueDTO> {
    return this.queuesService.registerQueue(body);
  }

  @Get('all')
  async findAll(): Promise<QueueDTO[]> {
    return this.queuesService.findAll();
  }
}
