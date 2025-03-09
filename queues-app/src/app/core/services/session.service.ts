import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { Session } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private readonly auth: AuthService, private readonly storage: StorageService) {
    this.init();
  }

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
  }

  private removeSession() {
    this.storage.removeSession();
  }

}
