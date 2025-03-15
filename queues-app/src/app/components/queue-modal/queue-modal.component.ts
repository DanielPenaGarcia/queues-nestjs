import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-queue-modal',
  imports: [CommonModule, ProgressSpinnerModule, CardModule],
  templateUrl: './queue-modal.component.html',
  styleUrl: './queue-modal.component.css'
})
export class QueueModalComponent {

  @Input() inQueue: number = 0;
  @Input() title: string = 'Estás en la cola';
  @Input() message: string = 'Por favor, espera tu turno.';

  constructor() { }
}
