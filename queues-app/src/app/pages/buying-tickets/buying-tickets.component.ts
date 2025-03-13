import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuyingTicketsService } from './buying-tickets.service';
import { SectionDTO, ShowingDTO } from './buying-tickets.types';
import { SectionComponent } from "../../components/section/section.component";
import { PurchaseService } from '@core/services/purchase.service';

@Component({
  selector: 'app-buying-tickets',
  imports: [CommonModule, SectionComponent],
  templateUrl: './buying-tickets.component.html',
  styleUrl: './buying-tickets.component.css',
})
export class BuyingTicketsComponent implements OnInit {
  showing: ShowingDTO;
  sections: SectionDTO[];
  inProgress = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly buyingTicketsService: BuyingTicketsService,
    private readonly purchaseService: PurchaseService
  ) {}

  ngOnInit() {
    this.loadShowing();
    this.purchaseService.purchasesSubject.subscribe((hasPurchases) => {
      this.inProgress = hasPurchases;
    });
  }

  loadShowing() {
    this.buyingTicketsService.findShowingById(this.showingId).subscribe({
      next: (showing) => {
        this.showing = showing;
        this.sections = showing.screen.seats.reduce((acc, seat) => {
          const section = acc.find((s) => s.row === seat.row);
          if (section) {
            section.seats.push(seat);
          } else {
            acc.push({
              id: seat.row,
              row: seat.row,
              seats: [seat],
            });
          }
          return acc;
        }, []);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  get showingId() {
    return this.activatedRoute.snapshot.paramMap.get('showing');
  }
}
