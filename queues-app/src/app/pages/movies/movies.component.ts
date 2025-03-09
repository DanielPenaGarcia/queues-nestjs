import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from './movies.service';
import { MovieCard } from 'src/app/components/movie-card/movie-card.types';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { MoviesPage } from './movies.types';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {

  movies: MovieCard[] = [];

  constructor(private readonly moviesService: MoviesService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.moviesService.getMovies().subscribe({
      next: (page: MoviesPage) => {
        this.movies = page.movies;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
