import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Festival } from 'src/entities/classes/festival.entity';
import { REDIS_OPTIONS } from 'src/utils/providers/redis.provider';
import { Repository } from 'typeorm';
import { ConnectionOptions, Job, Queue, Worker } from 'bullmq';

@Injectable()
export class FestivalsService {
  constructor(
    @InjectRepository(Festival)
    private readonly festivalService: Repository<Festival>,
    @Inject(REDIS_OPTIONS)
    private readonly bullConnectionConfiguration: ConnectionOptions,
  ) {}

  async createFestival(name: string): Promise<Festival> {
    const festival = this.festivalService.create({ name });
    await this.festivalService.save(festival);
    this.createQueueByFestivalId(festival.id);
    return festival;
  }

  async takeTicket(festivalId: string): Promise<Job> {
    try {
      const festival = await this.festivalService.findOneOrFail({
        where: { id: festivalId },
      });
    } catch (error) {
        throw new NotFoundException('Festival not found');
    }
    const queue = new Queue(festivalId, { connection: this.bullConnectionConfiguration });
    const job = queue.add('takeTicket', { festivalId }, { delay: 5000 });
    return job;
  }

  private createQueueByFestivalId(festivalId: string): void {
    const queueName = `${festivalId}`;
    const queue = new Queue(queueName, {
      connection: this.bullConnectionConfiguration,
    });
    const worker = new Worker(queueName, this.festivalWorkProcess, {
      connection: this.bullConnectionConfiguration,
      concurrency: 5,
    });
  }

  async festivalWorkProcess(job: Job): Promise<void> {
    console.log(`Processing job ${job.id} with data ${job.data}`);
  }
}
