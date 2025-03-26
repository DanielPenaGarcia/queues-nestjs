import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { AppService } from './app.service';
import { FormsModule } from '@angular/forms';
import { Festival } from '@core/interfaces/festival.interface';
import { LineService } from '@core/services/line.service';
import { Job } from './models/job.interface';
import { interval, takeWhile } from 'rxjs';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AppService, LineService],
})
export class AppComponent implements OnInit {
  title = 'queues-app';
  userId: string;
  isBlocked: boolean = false;
  lineService: LineService = inject(LineService);

  ngOnInit() {
    this.userId = this.lineService.UserId;
  }

  blockUserId() {
    if (this.userId) {
      this.lineService.UserId = this.userId;
      this.isBlocked = true;
    }
  }
}
