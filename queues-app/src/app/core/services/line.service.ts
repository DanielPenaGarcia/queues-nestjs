import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { io, Socket } from 'socket.io-client';
import { JoinDTO } from './interfaces/join-listener';
import { Observable } from 'rxjs';
import { JOIN } from './constants/events';

@Injectable({
  providedIn: 'root',
})
export class LineService {
  private isAlreadyConnected: boolean = false;
  private userId: string;
  private socket: Socket;
  private url: string = `${environment.socket}/line`;

  constructor() {}

  connect() {
    if (this.isAlreadyConnected && this.socket && this.socket.connected) {
      console.log('🔌 Ya conectado. No se creará una nueva conexión.');
      return;
    }
    this.socket = io(this.url);
    this.isAlreadyConnected = true;
  }

  join(join: JoinDTO) {
    this.socket.emit(JOIN, join);
  }

  addMinute(jobId: string) {
    this.socket.emit('add-minute', { jobId });
  }

  listen<T>(event: string): Observable<T> {
    return new Observable((observer) => {
      this.socket.on(event, (data: T) => {
        observer.next(data);
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
