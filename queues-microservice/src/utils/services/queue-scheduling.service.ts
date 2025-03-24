import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueEntity } from '../../entities/classes/queue.entity';
import { LessThan, Repository } from 'typeorm';
import { REDIS_OPTIONS } from '../providers/redis.provider';
import { ConnectionOptions, Queue } from 'bullmq';

@Injectable()
export class QueueSchedulingService {

    constructor(@InjectRepository(QueueEntity) private readonly queuesRepository: Repository<QueueEntity>, @Inject(REDIS_OPTIONS) private readonly bullConnection: ConnectionOptions) {}

    @Cron('0 0 * * 1')
    async removeExpiredQueues() {
        const queues = await this.queuesRepository.find({ where: { expires: LessThan(new Date()) } });
        const promises = queues.map(async (queue) => {
            try {
                const queueMQ = new Queue(queue.name, { connection: this.bullConnection });
                await queueMQ.obliterate({ force: true });
                await this.queuesRepository.delete(queue.id);
                console.log(`Queue ${queue.name} removed and cleaned.`);
            } catch (error) {
                console.error(`Failed to remove queue ${queue.name}:`, error);
            }
        });
        await Promise.all(promises);
        console.log('Expired queues removed.');
    }
    
}
