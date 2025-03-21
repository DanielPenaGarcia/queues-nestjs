import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { FormsModule } from '@angular/forms';
import { Festival } from '@core/interfaces/festival.interface';
import { LineService } from '@core/services/line.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AppService, LineService]
})
export class AppComponent implements OnInit {

  title = 'queues-app';
  festivalName: WritableSignal<string> = signal('');
  appService: AppService = inject(AppService);
  lineService: LineService = inject(LineService);
  festival: Festival;

  ngOnInit() {}

  addFestival() {
    this.appService.createFestival({ name: this.festivalName() }).subscribe({
      next: (festival: Festival) => {
        this.festival = festival;
        this.festivalName.set('');
      },
      error: (error: Error) => {
        console.error(error);
      }
    });
  }

  private putInLine(festivalId: string, jobId: string) {
    try {
      this.lineService.connect();
      this.lineService.join({ room: festivalId });
      this.lineService.listen(jobId).subscribe({
        next: (job: any) => {
          console.log(job);
        },
        error: (error: Error) => {
          console.error(error);
        }
      })
    } catch (error) {
      console.error(error);
    }
  }
}
