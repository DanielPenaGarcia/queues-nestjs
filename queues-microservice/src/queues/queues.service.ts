import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueEntity } from '../entities/classes/queue.entity';
import { Repository } from 'typeorm';
import { RegisterQueueDTO } from './models/inputs/register-queue.model';
import { QueueDTO } from './models/queue.model';
import { WorkerDTO } from './models/worker.model';
import { ConnectionOptions, Queue, Worker } from 'bullmq';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TURN_STARTED } from '../line/events/turn-started.event';
import { TurnStartedDTO } from '../line/models/turn-started.model';
import ms from 'ms';
import { ADD_TIME } from '../line/events/add-time.event';
import { REDIS_OPTIONS } from '../utils/providers/redis.provider';

@Injectable()
export class QueuesService {
    constructor(@InjectRepository(QueueEntity) private readonly queuesRepository: Repository<QueueEntity>, @Inject(REDIS_OPTIONS) private readonly bullConnection: ConnectionOptions, private readonly eventEmitter: EventEmitter2) { }

    async registerQueue(queueDTO: RegisterQueueDTO): Promise<QueueDTO> {
        const queueEntity = this.queuesRepository.create({ name: queueDTO.name, expires: queueDTO.expires, workers: queueDTO.workers.length });
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
            const worker = new Worker(queue, async job => {
                const turnStarted = new TurnStartedDTO();
                this.eventEmitter.emit(TURN_STARTED, turnStarted);
                const additionalTime = workerDTO.additionalTime;
                let addTime: boolean = false;
                this.eventEmitter.addListener(ADD_TIME, () => {
                    addTime = true;
                });
                await this.delay(ms(workerDTO.expiresIn));
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
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

}
