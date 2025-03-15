import { Inject, Injectable, Scope } from '@nestjs/common';
import { REDIS_OPTIONS } from '../providers/redis-options.provider';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, Queue, RedisOptions } from 'bullmq';

@Injectable()
export class QueuesService {

    private queues: Map<string, Queue> = new Map();

    constructor(@Inject(REDIS_OPTIONS) private readonly redisOptions: RedisOptions) {}
    
    createQueue(queueName: string): Queue {

        const queue = new Queue(queueName, { connection: this.redisOptions });
        this.queues.set(queueName, queue);
        
        @Processor(queueName)
        class QueueProcessor extends WorkerHost {
            process(job: Job, token?: string): Promise<any> {
                console.log(`Processing job ${job.id} from queue ${queueName}`);
                return job.data;
            }
        }
        return queue;
    }
}
