import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieDTO, ShowingDTO } from './buying-tickets.types';
import { BuyingTicketsService } from './buying-tickets.service';
import { ActivatedRoute } from '@angular/router';
import { ShowingComponent } from "../../components/showing/showing.component";

@Component({
  selector: 'app-buying-tickets',
  imports: [CommonModule, ShowingComponent],
  templateUrl: './buying-tickets.component.html',
  styleUrl: './buying-tickets.component.css'
})
export class BuyingTicketsComponent implements OnInit {

  showings: ShowingDTO[];
  movie: MovieDTO;


  constructor(private readonly buyingTicketsService: BuyingTicketsService, private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.getMovieInfo();
    this.getShowings();
  }

  private getMovieInfo(): void {
    this.buyingTicketsService.getMovieById(this.movieId).subscribe({
      next: (movie: MovieDTO) => {
        this.movie = movie;
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  private getShowings(): void {
    this.buyingTicketsService.getShowings().subscribe({
      next: (showings: ShowingDTO[]) => {
        this.showings = showings;
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  private get movieId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }
}
