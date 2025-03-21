import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateFestivalDTO } from './models/create-festival.interface';
import { Observable } from 'rxjs';
import { Festival } from '@core/interfaces/festival.interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }

  createFestival(festival: CreateFestivalDTO) : Observable<Festival> {
    return this.http.post<Festival>(`${environment.api}/festivals`, festival);
  }
}
