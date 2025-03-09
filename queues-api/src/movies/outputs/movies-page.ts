import { Movie } from "@entities/classes/movie.entity";

export interface MoviesPageDTO {
    movies: Movie[];
    count: number;
    totalPages: number;
    currentPage: number;
}