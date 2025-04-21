import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

type SongPayload = {
  title: string;
  artist: string;
  song: { lyrics: string; chords?: string }[];
};

@WebSocketGateway({
  cors: {
    origin: [
      `http://localhost:${process.env.PORT}`,
      `http://127.0.0.1:${process.env.PORT}`,
      'https://jamoveo-two.vercel.app',
    ],
    credentials: true,
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(AppGateway.name);

  handleConnection({ id }: Socket) {
    this.logger.log(`Client connected: ${id}`);
    // TODO: You can later associate socket.id with a user or room here
  }

  handleDisconnect({ id }: Socket) {
    this.logger.log(`Client disconnected: ${id}`);
    // TODO: Cleanup socket-to-user mapping here
  }

  @SubscribeMessage('selectSong')
  handleSelectSong(
    @MessageBody() payload: SongPayload,
    @ConnectedSocket() { id }: Socket,
  ): void {
    this.logger.log(`Song selected by ${id}: ${payload.title}`);
    this.server.emit('songSelected', payload);
  }

  @SubscribeMessage('quitSong')
  handleQuitSong(@ConnectedSocket() { id }: Socket): void {
    this.logger.log(`Quit triggered by ${id}`);
    this.server.emit('quitSong');
  }
}
