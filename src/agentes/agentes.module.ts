import { Module } from '@nestjs/common';
import { AgentesService } from './agentes.service';

@Module({
  providers: [AgentesService],
})
export class AgentesModule {}
