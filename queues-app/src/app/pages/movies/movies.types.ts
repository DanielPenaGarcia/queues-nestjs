import { MovieCard } from "src/app/components/movie-card/movie-card.types";

export interface MoviesParams {
    page: number;
    count: number;
    sort: string;
    search: string;
}

export interface MoviesPage {
  movies: MovieCard[];
  count: number;
  totalPages: number;
  currentPage: number;
}
