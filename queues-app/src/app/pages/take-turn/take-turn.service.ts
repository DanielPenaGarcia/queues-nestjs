import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TakeTurnDTO, TakeTurnResponseDTO } from './take-turn.types';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class TakeTurnService {
  constructor(private readonly http: HttpClient) {}

  takeTurn(body: TakeTurnDTO): Observable<TakeTurnResponseDTO> {
    return this.http.post<TakeTurnResponseDTO>(
      `${environment.api}/turns`,
      body
    );
  }

  validateToken(): Observable<TakeTurnDTO> {
    return this.http.post<TakeTurnDTO>(`${environment.api}/turns/validate`, {});
  }
}
