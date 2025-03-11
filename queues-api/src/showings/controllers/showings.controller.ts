import { Controller, Get, Param } from '@nestjs/common';
import { ShowingsService } from '../services/showings.service';
import { Showing } from '@entities/classes/showing.entity';

@Controller('showings')
export class ShowingsController {
    constructor(private readonly showingsService: ShowingsService){}

    @Get()
    async findAllShowings(): Promise<Showing[]> {
        return await this.showingsService.findAllShowings();
    }

    @Get('movie/:movieId/language/:languageId')
    async findAllShowingsByMovieIdAndLanguageId(@Param('movieId') movieId: string, @Param('languageId') languageId: string) {
        return await this.showingsService.findShowingByMovieIdAndLanguageId(movieId, languageId);
    }
}
