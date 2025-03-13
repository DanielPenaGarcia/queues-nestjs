import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from "../../components/nav/nav.component";

@Component({
  selector: 'app-common',
  imports: [CommonModule, RouterModule, NavComponent],
  templateUrl: './common.component.html',
  styleUrl: './common.component.css'
})
export class CommonComponent {

}
