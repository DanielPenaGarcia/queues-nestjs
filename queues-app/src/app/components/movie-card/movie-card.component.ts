import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MovieCard } from './movie-card.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {

  constructor(private readonly router: Router) {}

  @Input() movie: MovieCard;

  onMovieClick() {
    this.router.navigate(['/movie', this.movie.id]);
  }
}
