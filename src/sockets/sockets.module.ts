import { Module } from '@nestjs/common';
import { SocketsGateway } from './sockets.gateway';
import { SocketsService } from './sockets.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [SocketsGateway, SocketsService],
  exports: [SocketsService],
})
export class SocketsModule {}
