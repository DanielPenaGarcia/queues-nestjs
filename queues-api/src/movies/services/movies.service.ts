import { Movie } from '@entities/classes/movie.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { FindAllMoviesDTO } from '../inputs/find-all-movies.query';
import { MoviesPageDTO } from '../outputs/movies-page';

@Injectable()
export class MoviesService {
    
    constructor(@InjectRepository(Movie) private readonly moviesRepository: Repository<Movie>){}

    async findMovieById(id: string, query?: any): Promise<Movie> {
      const movie: Movie | null = await this.moviesRepository.findOne({
        where: {
          id: id
        }
      });
      if (!movie) {
        throw new NotFoundException(`Movie with ${id} does not exist`);
      }
      return movie;
    }

    async findMovies(query: FindAllMoviesDTO): Promise<MoviesPageDTO> {
        const [movies, total]: [Movie[], number] = await this.moviesRepository.findAndCount({
            select: {
                id: true,
                name: true,
                description: true,
                duration: true,
                isAvailable: true,
                posterUrl: true,
            },
            where: [
                {
                  name: ILike(`%${query.search}%`),
                },
                {
                  description: ILike(`%${query.search}%`),
                },
              ],
            take: query.count,
            skip: query.skip
        });
        return this.moviesAndCountToMoviesPage(movies, total, query.count, query.page);
    }

    private moviesAndCountToMoviesPage(movies: Movie[], total: number, take: number, page: number): MoviesPageDTO {
      return {
        movies: movies,
        count: total,
        totalPages: Math.ceil(total/take),
        currentPage: page
      };
    }
}
