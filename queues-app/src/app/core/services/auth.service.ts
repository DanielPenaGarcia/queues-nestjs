import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/interfaces';
import { environment } from '@env/environment';
import { Observable, switchMap, tap } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient, private readonly storage: StorageService) { }

  signIn({ email, password }): Observable<User> {
    return this.http.post<User>(`${environment.api}/sign-in`, { email, password }).pipe(
      tap((user: User) => {
        this.storage.setUser(user);
      })
    )
  }
}
