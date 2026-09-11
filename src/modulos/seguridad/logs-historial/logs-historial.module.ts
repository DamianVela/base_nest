import { Module } from '@nestjs/common';
import { LogsHistorialService } from './logs-historial.service';
import { LogsHistorialController } from './logs-historial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogHistorial } from '../../../entities/log-historial.entity';
import { Rol } from '../../../entities/rol.entity';
import { AuthModule } from '../../../auth/auth.module';

@Module({
  controllers: [LogsHistorialController],
  providers: [LogsHistorialService],
  imports: [TypeOrmModule.forFeature([LogHistorial, Rol]), AuthModule],
})
export class LogsHistorialModule {}
