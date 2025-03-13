import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieDTO, ShowingDTO } from './movie-showings.types';
import { MovieShowingsService } from './movie-showings.service';
import { ActivatedRoute } from '@angular/router';
import { ShowingComponent } from '../../components/showing/showing.component';

@Component({
  selector: 'app-movie-showings',
  imports: [CommonModule, ShowingComponent],
  templateUrl: './movie-showings.component.html',
  styleUrl: './movie-showings.component.css',
})
export class MovieShowingsComponent implements OnInit {
  showings: ShowingDTO[];
  movie: MovieDTO;

  constructor(
    private readonly moviesShowingsService: MovieShowingsService, private readonly activatedRoute: ActivatedRoute){}

  ngOnInit() {
    this.getMovieInfo();
    this.getShowings();
  }

  private getMovieInfo(): void {
    this.moviesShowingsService.getMovieById(this.movieId).subscribe({
      next: (movie: MovieDTO) => {
        this.movie = movie;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  private getShowings(): void {
    this.moviesShowingsService.getShowings().subscribe({
      next: (showings: ShowingDTO[]) => {
        this.showings = showings;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  private get movieId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }
}
