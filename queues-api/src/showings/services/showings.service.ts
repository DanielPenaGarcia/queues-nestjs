import { Showing } from '@entities/classes/showing.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ShowingsService {
    constructor(@InjectRepository(Showing) private readonly showingsRepository: Repository<Showing>){}

    async findAllShowings(): Promise<Showing[]> {
        return this.showingsRepository.find();
    }
 }
