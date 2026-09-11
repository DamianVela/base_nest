import { Module } from '@nestjs/common';
import { UbicacionesService } from './ubicaciones.service';
import { UbicacionesController } from './ubicaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ubicacion } from '../../entities/ubicacion.entity';

@Module({
  controllers: [UbicacionesController],
  providers: [UbicacionesService],
  imports: [TypeOrmModule.forFeature([Ubicacion])],
})
export class UbicacionesModule {}
