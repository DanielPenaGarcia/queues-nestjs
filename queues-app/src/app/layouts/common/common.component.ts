import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-common',
  imports: [CommonModule, RouterModule],
  templateUrl: './common.component.html',
  styleUrl: './common.component.css'
})
export class CommonComponent {

}
