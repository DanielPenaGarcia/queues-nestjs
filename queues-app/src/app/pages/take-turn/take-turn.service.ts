import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TakeTurnDTO, TurnTakedDTO } from './take-turn.types';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TakeTurnService {

  constructor(private readonly http: HttpClient) { }

  takeTurn(body: TakeTurnDTO): Observable<TurnTakedDTO> {
    return this.http.post<TurnTakedDTO>(`${environment.api}/turns`, body);
  }

}
