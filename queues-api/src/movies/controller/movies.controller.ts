import { Controller, Get } from '@nestjs/common';
import { MoviesService } from '../services/movies.service';
import { FindAllMoviesQuery } from '../decorators/find-all-movies.decorator';
import { FindAllMoviesDTO } from '../inputs/find-all-movies.query';
import { MoviesPageDTO } from '../outputs/movies-page';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    async findAll(@FindAllMoviesQuery() query: FindAllMoviesDTO): Promise<MoviesPageDTO> {
        return this.moviesService.findMovies(query);
    }
}
