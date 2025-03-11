import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShowingDTO } from './showing.types';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowingService {

  constructor(private readonly http: HttpClient) { }

  findShowings(movieId: string, languageId: string): Observable<ShowingDTO[]> {
    return this.http.get<ShowingDTO[]>(`${environment.api}/showings/movie/${movieId}/language/${languageId}`);
  }

}
