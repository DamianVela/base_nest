import { Controller, Get, Query } from '@nestjs/common';
import { UbicacionesService } from './ubicaciones.service';
import { SearchUbicacionDto } from './dto/search-ubicacion.dto';
import { PaginacionDto } from '../../common/dto/pagination.dto';

@Controller('ubicaciones')
export class UbicacionesController {
  constructor(private readonly ubicacionesService: UbicacionesService) {}
  @Get()
  getAllUbicaciones(
    @Query() searchUbicacionDto: SearchUbicacionDto,
    paginacion: PaginacionDto,
  ) {
    return this.ubicacionesService.findAll(searchUbicacionDto, paginacion);
  }
}
