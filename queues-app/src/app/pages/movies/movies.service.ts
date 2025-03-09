import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MoviesPage, MoviesParams } from './movies.types';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  params: MoviesParams = {
    page: 0,
    count: 10,
    sort: '',
    search: ''
  }

  constructor(private readonly http: HttpClient) { }

  getMovies(): Observable<MoviesPage> {
    return this.http.get <MoviesPage>(`${environment.api}/movies`, { params: <any>this.params });
  }
}
