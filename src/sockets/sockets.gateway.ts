import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';
import { SocketsService } from './sockets.service';
import { socketAuthMiddleware } from './socket-auth.middleware';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
})
export class SocketsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly socketsService: SocketsService,
  ) {}

  afterInit(server: Server) {
    this.socketsService.setServer(server);

    server.use(socketAuthMiddleware(this.jwtService, this.configService));
  }

  handleConnection(socket: Socket) {
    console.log('Cliente conectado:', socket.id, socket.data.usuario);
  }

  handleDisconnect(socket: Socket) {
    console.log('Cliente desconectado:', socket.id);
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() room: string,
  ) {
    socket.join(room);
  }

  @SubscribeMessage('chat-message')
  handleChatMessage(
    @MessageBody()
    data: {
      room: string;
      mensaje: string;
    },
  ) {
    const { room, mensaje } = data;

    this.server.to(room).emit('chat-message', {
      mensaje,
    });
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() room: string,
  ) {
    socket.leave(room);
  }
}
