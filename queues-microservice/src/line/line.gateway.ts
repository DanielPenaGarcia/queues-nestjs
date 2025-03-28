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
    console.log('Connected', client.id);
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

  @SubscribeMessage('JOIN')
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

  sendToRoom(room: string, event: string, data: any) {
    try {
      this.server.to(room).emit(event, data);
    } catch (error) {
      console.error('Error sending to room', error);
    }
  }

  @OnEvent(TURN_STARTED)
  handleTurnInProgress(payload: TurnStartedDTO) {
    this.sendToRoom(payload.data.payload.room, payload.event, payload);
  }
}
