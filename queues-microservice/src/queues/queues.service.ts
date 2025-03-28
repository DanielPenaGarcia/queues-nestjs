import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueEntity } from '../entities/classes/queue.entity';
import { Repository } from 'typeorm';
import { RegisterQueueDTO } from './models/inputs/register-queue.model';
import { QueueDTO } from './models/queue.model';
import { WorkerDTO } from './models/worker.model';
import { ConnectionOptions, Job, Queue, Worker } from 'bullmq';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TURN_STARTED } from '../line/events/turn-started.event';
import { TurnStartedDTO } from '../line/models/turn-started.model';
import * as ms from 'ms';
import { ADD_TIME } from '../line/events/add-time.event';
import { REDIS_OPTIONS } from '../utils/providers/redis.provider';
import { WorkerEntity } from '../entities/classes/worker.entity';
import { TurnDTO } from '../turns/inputs/create-job.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class QueuesService {
    constructor(
        @InjectRepository(QueueEntity) private readonly queuesRepository: Repository<QueueEntity>,
        @Inject(REDIS_OPTIONS) private readonly bullConnection: ConnectionOptions,
        private readonly eventEmitter: EventEmitter2,
        private readonly jwt: JwtService
    ) { }

    async registerQueue(queueDTO: RegisterQueueDTO): Promise<QueueDTO> {
        const workers: WorkerEntity[] = queueDTO.workers.map((workerDTO: WorkerDTO) => {
            const workerEntity = new WorkerEntity();
            workerEntity.name = workerDTO.name;
            workerEntity.expiresIn = workerDTO.expiresIn;
            workerEntity.additionalTime = workerDTO.additionalTime;
            workerEntity.concurrency = workerDTO.concurrency;
            return workerEntity;
        })
        const queueEntity = this.queuesRepository.create({ name: queueDTO.name, expires: queueDTO.expires, workers: workers });
        try {
            await this.queuesRepository.save(queueEntity);
        } catch (error) {
            throw new InternalServerErrorException('Failed to register queue.', error.message);
        }
        const queue = new Queue(queueEntity.name, { connection: this.bullConnection });
        this.createWorkers(queueEntity.name, queueDTO.workers);
        return new QueueDTO(queueEntity.name, queueEntity.expires);
    }

    async findAll(): Promise<QueueDTO[]> {
        const queues = await this.queuesRepository.find();
        return queues.map(queue => new QueueDTO(queue.name, queue.expires));
    }

    private createWorkers(queue: string, workersDTO: WorkerDTO[]): Worker[] {
        const workers: Worker[] = workersDTO.map(workerDTO => {
            const worker = new Worker(queue, async (job: Job<TurnDTO>) => {
                this.emitTurnStartedByJob(job, workerDTO.expiresIn);
                const additionalTime = workerDTO.additionalTime;
                let addTime: boolean = false;
                this.eventEmitter.addListener(ADD_TIME, () => {
                    addTime = true;
                });
                await this.delay(ms(workerDTO.expiresIn));
                console.log(`Turn ${job.id} has expired.`);
                this.eventEmitter.removeListener(ADD_TIME, () => { });
                if (addTime) {
                    await this.delay(ms(additionalTime));
                }
            }, { name: workerDTO.name, connection: this.bullConnection, concurrency: workerDTO.concurrency });
            return worker;
        });
        return workers;
    }

    private delay(seconds: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, seconds));
    }

    async initWorkers(): Promise<void> {
        const queues = await this.queuesRepository.find();
        queues.forEach(queue => {
            const workers = this.createWorkers(queue.name, queue.workers);
            workers.forEach(worker => worker.waitUntilReady());
        });
    }

    private emitTurnStartedByJob(job: Job<TurnDTO>, expiresIn: string | number): void {
        const turnStarted = new TurnStartedDTO();
        turnStarted.event = `${TURN_STARTED}-${job.data.queue}`;
        const expires: Date = this.addMillisecondsToCurrentDate(ms(expiresIn));
        const token = this.jwt.sign({ ...job.data }, { expiresIn: expiresIn });
        turnStarted.data = {
            accessToken: token,
            expires: expires,
            payload: job.data,
        };
        this.eventEmitter.emit(TURN_STARTED, turnStarted);
    }

    addMillisecondsToCurrentDate(milliseconds: number): Date {
        const now = new Date();
        now.setMilliseconds(now.getMilliseconds() + milliseconds);
        return now;
    }
}
