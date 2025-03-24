import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Festival } from 'src/entities/classes/festival.entity';
import { REDIS_OPTIONS } from 'src/utils/providers/redis.provider';
import { Repository } from 'typeorm';
import { ConnectionOptions, Job, Processor, Queue, Worker } from 'bullmq';
import { LineGateway } from 'src/line/line.gateway';
import { COMPLETED, FAILED, PROGRESS } from '../utils/constants/bull-events.constant';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DataJob } from '../turns/models/data-job.model';
import { TurnInProgressDTO } from '../turns/models/turn-in-progress.model';

@Injectable()
export class FestivalsService {

  private readonly logger: Logger = new Logger(FestivalsService.name);

  constructor(
    @InjectRepository(Festival)
    private readonly festivalService: Repository<Festival>,
    @Inject(REDIS_OPTIONS)
    private readonly bullConnection: ConnectionOptions,
    private readonly turnsGateway: LineGateway,
    private eventEmitter: EventEmitter2
  ) { }

  async createFestival(name: string): Promise<Festival> {
    const festival = this.festivalService.create({ name });
    await this.festivalService.save(festival);
    this.createQueue(festival.id, async (job: Job<DataJob>) => {
      this.logger.log(`Proceso iniciado para ${job.id}`);
      const data: TurnInProgressDTO = new TurnInProgressDTO(job.data.key, job.data.event);
      this.eventEmitter.emit('turn.in-progress', data);
      let delay = 0;
      this.eventEmitter.addListener(job.id!, () => {
        delay = 5000;
      });
      await this.delay(60000);
      this.eventEmitter.removeListener(job.id!, () => {});
      if (delay > 0) {
        await this.delay(delay);
      }
    })
    return festival;
  }

  private createQueue(queueName: string, callback: Processor) {
    const queue = new Queue(queueName, { connection: this.bullConnection });
    const worker: Worker = new Worker(queueName, callback, { connection: this.bullConnection })
  }

  private createQueueByFestivalId(festivalId: string): void {
    const queueName = `${festivalId}`;
    const queue = new Queue(queueName, {
      connection: this.bullConnection,
    });
    const worker = new Worker(queueName, this.festivalWorkProcess.bind(this), {
      connection: this.bullConnection,
      concurrency: 1,
    });
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async festivalWorkProcess(job: Job): Promise<void> {
    let moreDelay = 0;
    let isListenerAdded: boolean = false;
    this.eventEmitter.addListener(job.id!, (value) => {
      isListenerAdded = true;
      moreDelay = 5000;
    })
    console.log(`Iniciando el procesamiento del trabajo ${job.id}`);
    await this.delay(10000);
    this.eventEmitter.removeListener(job.id!, () => {
      console.log('removed')
    });
    await this.delay(moreDelay);
    console.log(moreDelay);
    console.log(`Trabajo ${job.id} completado después de 10 segundos`);
    try {
      this.turnsGateway.sendToRoom(job.data.festivalId, job.id!, { message: 'FINALIZÓ' });
    } catch (error) {
      console.log(error.message)
    }
  }

  private addListenersToWorker(worker: Worker): void {
    worker.on(COMPLETED, (job: Job, progress: number | object) => {
      console.log('Completed', job.id, progress);
    });
    worker.on('progress', (job: Job, progress: number | object) => {
      console.log('In progress', job.id, progress);
    });
    worker.on(FAILED, (job: Job, progress: number | object) => {
      console.log('Failed', job.id, progress);
    });
  }
}
