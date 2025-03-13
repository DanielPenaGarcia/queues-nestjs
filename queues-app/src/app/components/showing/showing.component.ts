import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LanguageDTO, ShowingDTO } from './showing.types';
import { ShowingService } from './showing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showing',
  imports: [CommonModule],
  templateUrl: './showing.component.html',
  styleUrl: './showing.component.css',
})
export class ShowingComponent implements OnInit {
  @Input() language: LanguageDTO;
  @Input() movieId: string;
  showings: ShowingDTO[];

  constructor(
    private readonly showingService: ShowingService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.showings = [];
    this.findAllShowings();
  }

  findAllShowings() {
    this.showingService.findShowings(this.movieId, this.language.id).subscribe({
      next: (showings) => {
        this.showings = showings;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  selectShowing(showingId: string) {
    this.router.navigate([`/movie/${this.movieId}/seats/${showingId}`]);
  }
}
