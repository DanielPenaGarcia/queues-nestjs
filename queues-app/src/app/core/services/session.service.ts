import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { Session } from './interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private readonly auth: AuthService, private readonly storage: StorageService, private readonly router: Router) {}

  init() {
    this.subscribeToSession();
  }

  private subscribeToSession() {
    this.auth.session$.subscribe((session: Session) => {
      if (session) {
        this.saveSession(session);
      } else {
        this.removeSession();
      }
    })
  }

  private saveSession(session: Session) {
    this.storage.saveSession(session);
    const url = this.storage.getRedirectUrl() || '/home';
    this.router.navigate([url], { replaceUrl: true });
    this.storage.removeRedirectUrl();
  }

  private removeSession() {
    this.storage.removeSession();
    this.router.navigate(['/home'], { replaceUrl: true });
  }

}
