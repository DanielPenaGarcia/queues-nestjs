import { Controller, Get } from '@nestjs/common';
import { ShowingsService } from '../services/showings.service';
import { Showing } from '@entities/classes/showing.entity';

@Controller('showings')
export class ShowingsController {
    constructor(private readonly showingsService: ShowingsService){}

    @Get()
    async findAllShowings(): Promise<Showing[]> {
        return this.showingsService.findAllShowings();
    }
}
