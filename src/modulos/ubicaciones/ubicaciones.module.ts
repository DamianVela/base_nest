import { Module } from '@nestjs/common';
import { UbicacionesService } from './ubicaciones.service';
import { UbicacionesController } from './ubicaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ubicacion } from '../../entities/ubicacion.entity';
import { AxiosAdapter } from '../../common/adapters/axios.adapter';

@Module({
  controllers: [UbicacionesController],
  providers: [UbicacionesService, AxiosAdapter],
  imports: [TypeOrmModule.forFeature([Ubicacion])],
})
export class UbicacionesModule {}
