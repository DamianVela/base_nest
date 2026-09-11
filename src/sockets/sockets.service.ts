import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketsService {
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  getServer(): Server {
    if (!this.server) {
      throw new Error('Socket.IO no ha sido inicializado');
    }

    return this.server;
  }

  notifyClients(
    room: string,
    eventName: string,
    data: Record<string, any> = {},
  ) {
    this.getServer().to(room).emit(eventName, data);
  }
}
