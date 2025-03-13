import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { environment } from '@env/environment';
import { MenuOptionsComponent } from "../menu-options/menu-options.component";

@Component({
  selector: 'app-nav',
  imports: [CommonModule, MenubarModule, TabViewModule, MenuOptionsComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {

  appIcon = `${environment.assets}/images/app-icon.png`;
  options: MenuItem[] = [];

  ngOnInit() {
    this.initOptions();
  }

  private initOptions(): void {
    this.options = [
      {
        label: 'Películas',
        items: [
          {
            label: 'Cartelera',
            icon: 'pi pi-fw pi-video',
            routerLink: '/home'
          }
        ]
      }
    ]
  }
}
