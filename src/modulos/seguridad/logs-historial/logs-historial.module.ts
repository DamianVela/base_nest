import { Module } from '@nestjs/common';
import { LogsHistorialService } from './logs-historial.service';
import { LogsHistorialController } from './logs-historial.controller';

@Module({
  controllers: [LogsHistorialController],
  providers: [LogsHistorialService],
})
export class LogsHistorialModule {}
