import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDTO, ShowingDTO } from './buying-tickets.types';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class BuyingTicketsService {

  constructor(private readonly http: HttpClient) { }

  getMovieById(id: string): Observable<MovieDTO> {
    return this.http.get<MovieDTO>(`${environment.api}/movies/${id}`);
  }

  getShowings(): Observable<ShowingDTO[]> {
    return this.http.get<ShowingDTO[]>(`${environment.api}/showings`);
  }
}
