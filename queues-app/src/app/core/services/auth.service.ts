import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Credentials, User } from '@core/interfaces';
import { environment } from '@env/environment';
import { map, Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { Session } from './interfaces';
import { SignUp } from './interfaces/sign-up.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public session$: EventEmitter<Session> = new EventEmitter<Session>(); 

  constructor(private readonly http: HttpClient, private readonly storage: StorageService) { }

  signIn(credentials: Credentials): Observable<User> {
    return this.http.post<Session>(`${environment.api}/auth/sign-in`, credentials).pipe(
      tap((session: Session) => this.session$.next(session)),
      map((session: Session) => session.user)
    );
  }

  signUp(signUp: SignUp): Observable<User> {
    return this.http.post<Session>(`${environment.api}/auth/sign-up`, signUp).pipe(
      tap((session: Session) => this.session$.next(session)),
      map((session: Session) => session.user)
    );
  }

  signOut(): void {
    this.storage.removeSession();
    this.session$.next(null);
  }

  getSession(): Session {
    return this.storage.getSession();
  }
}
