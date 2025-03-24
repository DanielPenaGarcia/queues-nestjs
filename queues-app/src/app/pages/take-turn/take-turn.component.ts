import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { QueuesService } from '@shared/services/queues.service';
import { QueueDTO } from './take-turn.types';

@Component({
  selector: 'app-take-turn',
  imports: [CommonModule],
  templateUrl: './take-turn.component.html',
  styleUrl: './take-turn.component.css',
})
export class TakeTurnComponent implements OnInit {

  queues: WritableSignal<QueueDTO[]> = signal([]);

  private readonly queuesService: QueuesService = inject(QueuesService);

  ngOnInit() {
    this.loadQueues();
  }

  loadQueues() {
    this.queuesService.findAll().subscribe({
      next: (queues: QueueDTO[]) => {
        this.queues.set(queues);
      },
      error: (error: Error) => {
        console.error(error);
      }
    })
  }
}
