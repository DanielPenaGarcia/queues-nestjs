import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LanguageDTO, ShowingDTO } from './showing.types';
import { ShowingService } from './showing.service';

@Component({
  selector: 'app-showing',
  imports: [CommonModule],
  templateUrl: './showing.component.html',
  styleUrl: './showing.component.css'
})
export class ShowingComponent implements OnInit {

  @Input() language: LanguageDTO;
  @Input() movieId: string;
  showings: ShowingDTO[];

  constructor(private readonly showingService: ShowingService) { }

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
      }
    });
  }
}
