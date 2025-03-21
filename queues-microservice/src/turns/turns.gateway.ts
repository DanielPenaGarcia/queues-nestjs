import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';


@WebSocketGateway({ cors: 'localhost:4200', namespace: 'line' })
export class TurnsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  afterInit(server: any) {
    console.log('Init');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Connected');
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
    client.join(payload.room);
    console.log(client.rooms);
    return `Joined room ${payload.room}`;
  }

  @SubscribeMessage('leave')
  handleLeave(client: any, payload: any): string {
    client.leave(payload.room);
    console.log(client.rooms);
    return `Left room ${payload.room}`;
  }

  sendToRoom(room: string, event: string, message: any) {
    this.server.to(room).emit(event, message);
  }
}
