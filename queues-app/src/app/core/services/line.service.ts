import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { io, Socket } from 'socket.io-client';
import { Join } from './interfaces/join-listener';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineService {

  private userId: string;
  private socket: Socket;
  private url: string = `${environment.socket}/line`;

  constructor() {}

  connect() {
    this.socket = io(this.url);
  }

  join(join: Join) {
    this.socket.emit('join', join);
  }

  addMinute(jobId: string) {
    this.socket.emit('add-minute', { jobId });
  }

  listen(event: string): Observable<any> {
    return new Observable(subscriber => {
      this.socket.on(event, data => {
        subscriber.next(data);
      });
    });
  }

  set UserId(userId: string) {
    this.userId = userId;
  }

  get UserId(): string {
    return this.userId;
  }
}
