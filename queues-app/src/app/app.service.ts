import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateFestivalDTO } from './models/create-festival.interface';
import { Observable } from 'rxjs';
import { Festival } from '@core/interfaces/festival.interface';
import { environment } from '@env/environment';
import { TakeTurnDTO } from './models/take-turn.interface';
import { Job } from './models/job.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }

  createFestival(festival: CreateFestivalDTO) : Observable<Festival> {
    return this.http.post<Festival>(`${environment.api}/festivals`, festival);
  }

  takeTurn(take: TakeTurnDTO): Observable<Job> {
    return this.http.post<Job>(`${environment.api}/festivals/take-turn`, take);
  }

  addMinute(jobId: string, festivalId: string): Observable<Job> {
    return this.http.post<Job>(`${environment.api}/festivals/${festivalId}/jobs/${jobId}/minute`, {});
  }
}
