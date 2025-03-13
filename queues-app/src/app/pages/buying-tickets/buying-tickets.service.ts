import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ShowingDTO } from './buying-tickets.types';

@Injectable({
  providedIn: 'root',
})
export class BuyingTicketsService {
  constructor(private readonly http: HttpClient) {}

  findShowingById(showingId: string): Observable<ShowingDTO> {
    return this.http.get<ShowingDTO>(
      `${environment.api}/showings/${showingId}`
    );
  }
}
