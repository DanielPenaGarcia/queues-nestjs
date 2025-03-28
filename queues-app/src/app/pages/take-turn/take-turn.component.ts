import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { QueuesService } from '@shared/services/queues.service';

import { LineService } from '@core/services/line.service';
import { TakeTurnService } from './take-turn.service';
import { QueueDTO } from './take-turn.types';
import { TurnStartedEventDTO } from '@core/services/interfaces/turn-started-event.interface';
import { TURN_STARTED } from '@core/services/constants/events';
import { StorageService } from '@core/services/storage.service';

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
  private readonly storage: StorageService = inject(StorageService);
  showValidateToken: boolean = false;
  validationMessage: string = '';

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
    if (!this.userId) {
      alert('No tienes una sesión iniciada. Por favor, inicia sesión para continuar.');
      return;
    }
    this.lineService.join({ room: this.userId });
    this.lineService.listen<TurnStartedEventDTO>(`${TURN_STARTED}-${queue.name}`).subscribe({
      next: (response: TurnStartedEventDTO) => {
        console.log('Turn started event received', response);
        this.showValidateToken = true;
        this.storage.setLineData({ accessToken: response.data.accessToken, expires: response.data.expires, payload: response.data.payload });
      },
      error: (error: Error) => {
        console.error(error);
      },
    });
    this.takeTurnService.takeTurn({ queue: queue.name, room: this.userId, data: {} }).subscribe({
      next: (response: any) => {
        console.log('Turn started successfully', response);
      },
      error: (error: Error) => {
        console.error('Error taking turn', error);
      },
    });

  }

  validateToken() {
    this.takeTurnService.validateToken().subscribe({
      next: (response: any) => {
        console.log('Token validated successfully', response);
        this.validationMessage = 'Token validated successfully';
      },
      error: (error: Error) => {
        console.error('Error validating token', error);
        this.validationMessage = 'Error validating token';
      },
    });
  }

  get userId(): string {
    return this.lineService.UserId;
  }


}
