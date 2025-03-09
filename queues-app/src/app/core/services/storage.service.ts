import { Injectable } from '@angular/core';
import { Session } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private SESSION_KEY = "SESSION";

  constructor() { }

  saveSession(session: Session): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
  }

  getSession(): Session {
    return JSON.parse(localStorage.getItem(this.SESSION_KEY));
  }

  removeSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

}
