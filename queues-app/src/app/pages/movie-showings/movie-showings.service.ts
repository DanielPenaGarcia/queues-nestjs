import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieDTO, ShowingDTO } from './movie-showings.types';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieShowingsService {

    constructor(private readonly http: HttpClient) { }

    getMovieById(id: string): Observable<MovieDTO> {
      return this.http.get<MovieDTO>(`${environment.api}/movies/${id}`);
    }

    getShowings(): Observable<ShowingDTO[]> {
      return this.http.get<ShowingDTO[]>(`${environment.api}/showings`);
    }

}
