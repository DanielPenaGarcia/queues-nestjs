import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { QueueDTO } from 'src/app/pages/take-turn/take-turn.types';

@Injectable({ providedIn: 'root' })
export class QueuesService {
  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<QueueDTO[]> {
    return this.http.get<QueueDTO[]>(`${environment.api}/queues/all`);
  }
}
