import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/interfaces';
import { AuthService } from '@core/services';
import { Session } from '@core/services/interfaces';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TieredMenu } from 'primeng/tieredmenu';

@Component({
  selector: 'app-menu-options',
  imports: [CommonModule, AvatarModule, TieredMenu, ButtonModule],
  templateUrl: './menu-options.component.html',
  styleUrl: './menu-options.component.css',
})
export class MenuOptionsComponent implements OnInit {
  user: User;
  options: MenuItem[];

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  ngOnInit() {
    this.loadUser();
    this.subscribeToUserChanges();
  }

  private subscribeToUserChanges(): void {
    this.auth.session$.subscribe(() => {
      this.loadUser();
    });
  }

  private loadUser(): void {
    this.user = this.auth.getSession()?.user;
    if (!this.user) {
      return this.initNoSessionOptions();
    }
    this.initSessionOptions();
  }

  private initSessionOptions(): void {
    this.options = [
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        iconClass: 'text-red-500',
        command: () => this.logout(),
      },
    ];
  }

  private initNoSessionOptions(): void {
    this.options = [
      {
        label: 'Iniciar sesión',
        icon: 'pi pi-sign-in',
        iconClass: 'text-red-500',
        command: () => this.goToLogin(),
      },
    ];
  }

  private logout(): void {
    this.auth.signOut();
  }

  private goToLogin(): void {
    this.router.navigate(['/sign-in']);
  }
}
