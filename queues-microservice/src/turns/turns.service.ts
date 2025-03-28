import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AddMinuteTurnDTO } from './inputs/add-minute-to-job.model';
import { MinuteAddedToJob } from './outputs/minute-added-to-job.model';
import { JwtService } from '@nestjs/jwt';
import { ConnectionOptions, Job, Queue } from 'bullmq';
import { TurnDTO } from './inputs/create-job.model';
import { TurnTakedDTO } from './outputs/turn-taked.model';
import { REDIS_OPTIONS } from '../utils/providers/redis.provider';

@Injectable()
export class TurnsService {

    constructor(private readonly eventEmitter: EventEmitter2, private readonly jwt: JwtService, @Inject(REDIS_OPTIONS) private readonly bullConnection: ConnectionOptions) { }

    async takeTurn(turn: TurnDTO): Promise<TurnTakedDTO> {
        const queue: Queue = new Queue(turn.queue, { connection: this.bullConnection });
        const job: Job = await queue.add('turn', turn);
        return new TurnTakedDTO(job.id!);
    }

    async addMinuteToTurn(addMinute: AddMinuteTurnDTO, expires: Date): Promise<MinuteAddedToJob> {
        this.eventEmitter.emit(addMinute.jobId);
        return new MinuteAddedToJob(addMinute.jobId);    
    }

    async validateToken(token: string): Promise<any> {
        try {
            const decoded = this.jwt.verify(token);
            return decoded;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

