import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { QueuesService } from '@shared/services/queues.service';
import {
  QueueDTO,
  TakeTurnDTO,
  TurnStartedDTO,
  TurnTakedDTO,
} from './take-turn.types';
import { LineService } from '@core/services/line.service';
import { TakeTurnService } from './take-turn.service';

@Component({
  selector: 'app-take-turn',
  imports: [CommonModule],
  templateUrl: './take-turn.component.html',
  styleUrl: './take-turn.component.css',
})
export class TakeTurnComponent implements OnInit {
  queues: WritableSignal<QueueDTO[]> = signal([]);

  private readonly queuesService: QueuesService = inject(QueuesService);
  private readonly lineService: LineService = inject(LineService);
  private readonly takeTurnService: TakeTurnService = inject(TakeTurnService);

  ngOnInit() {
    this.lineService.connect();
    this.loadQueues();
  }

  loadQueues() {
    this.queuesService.findAll().subscribe({
      next: (queues: QueueDTO[]) => {
        this.queues.set(queues);
      },
      error: (error: Error) => {
        console.error(error);
      },
    });
  }

  takeTurn(queue: QueueDTO) {
    if (!this.lineService.UserId) {
      alert('No hay un id asignado');
      return;
    }
    this.addLineListener(queue);
    const body: TakeTurnDTO = {
      queue: queue.name,
      room: this.lineService.UserId,
      data: {
        listen: this.lineService.UserId,
        data: {
          queue: queue.name,
          userId: this.lineService.UserId,
        },
      },
    };
    this.takeTurnService.takeTurn(body).subscribe({
      next: (turn: TurnTakedDTO) => {
        console.log(turn);
      },
      error: (error: Error) => {
        alert('Error al tomar turno');
        console.error(error);
      },
    });
  }

  private addLineListener(queue: QueueDTO) {
    this.lineService.join({ room: this.lineService.UserId });
    this.lineService.listen(`TURN_STARTED-${queue.name}`).subscribe({
      next: (data: TurnStartedDTO) => {
        alert('Turno tomado');
        console.log(data);
      },
      error: (error: Error) => {
        console.error(error);
      },
    });
  }

}
