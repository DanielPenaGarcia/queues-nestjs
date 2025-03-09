import { Injectable } from '@angular/core';
import { Session } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private SESSION_KEY = "SESSION";
  private REDIRECT_URL = "REDIRECT";

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

  saveRedirectUrl(url: string): void {
    localStorage.setItem(this.REDIRECT_URL, url);
  }

  getRedirectUrl(): string {
    return localStorage.getItem(this.REDIRECT_URL);
  }

  removeRedirectUrl(): void {
    localStorage.removeItem(this.REDIRECT_URL);
  }
}
