import { Injectable } from '@angular/core';
import { User } from '@core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private USER_KEY = "USER";

  constructor() { }

  getUser(): User {
    return JSON.parse(localStorage.getItem(this.USER_KEY));
  }

  setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  removeAll(): void {
    localStorage.clear();
  }
}
