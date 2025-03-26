import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { environment } from 'src/configurations/environment.config';
import { TURN_STARTED } from './events/turn-started.event';
import { TurnStartedDTO } from './models/turn-started.model';


@WebSocketGateway({ cors: environment.front.url, namespace: 'line' })
export class LineGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private eventEmitter: EventEmitter2){}

  handleConnection(client: any, ...args: any[]) {
    console.log(`Número de listeners para TURN_STARTED: ${this.eventEmitter.listeners(TURN_STARTED).length}`);
    console.log('Connected');
    this.server.emit('message', 'Hello world!');
  }

  handleDisconnect(client: any) {
    console.log('Disconnected');
  }

  @WebSocketServer()
  server: Server

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('join')
  handleJoin(client: any, payload: any): string {
    console.log('Joining room', payload.room);
    client.join(payload.room);
    return `Joined room ${payload.room}`;
  }

  @SubscribeMessage('add-minute')
  handleLeave(client: any, payload: any): string {
    this.eventEmitter.emit(payload.jobId);
    return `Left room ${payload.room}`;
  }

  sendToRoom(room: string, event: string, message: any) {
    try {
      this.server.to(room).emit(event, message);
    } catch (error) {
      console.error('Error sending to room', error);
    }
  }

  @OnEvent(TURN_STARTED)
  handleTurnInProgress(payload: TurnStartedDTO) {
    console.log('Turn started', payload);
    this.sendToRoom(payload.takeTurn.room, `${TURN_STARTED}-${payload.queue}`, payload);
  }
}
