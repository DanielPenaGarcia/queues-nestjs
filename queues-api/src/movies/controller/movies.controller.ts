import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from '../services/movies.service';
import { FindAllMoviesQuery } from '../decorators/find-all-movies.decorator';
import { FindAllMoviesDTO } from '../inputs/find-all-movies.query';
import { MoviesPageDTO } from '../outputs/movies-page';
import { Movie } from '@entities/classes/movie.entity';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}


    @Get(':id')
    async findById(@Param('id') id: string): Promise<Movie> {
        return this.moviesService.findMovieById(id);
    }

    @Get()
    async findAll(@FindAllMoviesQuery() query: FindAllMoviesDTO): Promise<MoviesPageDTO> {
        return this.moviesService.findMovies(query);
    }
}
