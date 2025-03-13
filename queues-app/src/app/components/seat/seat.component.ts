import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SeatDTO } from './seat.types';
import { ButtonModule } from 'primeng/button';
import { PurchaseService } from '@core/services/purchase.service';

@Component({
  selector: 'app-seat',
  imports: [CommonModule, ButtonModule],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.css'
})
export class SeatComponent implements OnInit {

  @Input() seat: SeatDTO;

  constructor(private readonly purchaseService: PurchaseService) {}

  ngOnInit() {}

  public onSelectedSeat() {
    this.purchaseService.add(this.seat);
    setTimeout(() => {
      this.purchaseService.remove();
    }, 1000);
  }
}
