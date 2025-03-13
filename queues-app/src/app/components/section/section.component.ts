import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SectionDTO } from './section.types';
import { SeatComponent } from "../seat/seat.component";

@Component({
  selector: 'app-section',
  imports: [CommonModule, SeatComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {

  @Input() section: SectionDTO;

}
