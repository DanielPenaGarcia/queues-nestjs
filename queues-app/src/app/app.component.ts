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
  festivalName: WritableSignal<string> = signal('');
  appService: AppService = inject(AppService);
  lineService: LineService = inject(LineService);
  festival: Festival;
  jobId: string;
  message: string;
  timerValue: WritableSignal<number> = signal(10);
  timerActive: boolean = false;
  showAddMinuteOption: boolean = false;
  minuteAdded: boolean = false;

  ngOnInit() {
    this.userId = this.lineService.UserId;
  }

  addFestival() {
    this.appService.createFestival({ name: this.festivalName() }).subscribe({
      next: (festival: Festival) => {
        this.festival = festival;
        this.festivalName.set('');
      },
      error: (error: Error) => {
        console.error(error);
      },
    });
  }

  takeTurn() {
    this.appService.takeTurn({ festivalId: this.festival.id }).subscribe({
      next: (job: Job) => {
        this.startTimer();
        this.jobId = job.id;
        this.putInLine(this.festival.id, this.jobId);
      },
      error: (error: Error) => {
        console.error(error);
      },
    });
  }

  private putInLine(festivalId: string, jobId: string) {
    try {
      this.lineService.connect();
      this.lineService.join({ room: festivalId });
      this.lineService.listen(jobId).subscribe({
        next: (message: any) => {
          this.message = message.message;
        },
        error: (error: Error) => {
          console.error(error);
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  addMinute() {
    if (!this.jobId || this.minuteAdded) {
      return;
    }
    this.lineService.addMinute(this.jobId);
  }

  startTimer() {
    if (this.timerActive) {
      console.log('El temporizador ya está corriendo.');
      return;
    }

    this.timerActive = true;

    // Dispara el timer cada segundo
    interval(1000)
      .pipe(
        // Mantener mientras el timer sea mayor que 0
        takeWhile(() => this.timerValue() > 0)
      )
      .subscribe({
        next: () => {
          this.timerValue.set(this.timerValue() - 1);
          if (this.timerValue() === 0) {
            console.log('¡Tiempo terminado!');
            this.timerActive = false;
          }
          // Agregar un minuto al temporizador cuando le falte 1 minuto
          if (this.timerValue() === 5 && !this.showAddMinuteOption) {
            this.showAddMinuteOption = true;
          }
        },
        error: (error) => console.error('Error en el temporizador:', error),
        complete: () => (this.timerActive = false),
      });
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  blockUserId() {
    this.isBlocked = true;
  }
}
