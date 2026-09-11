import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UbicacionesService } from './ubicaciones.service';
import { SearchUbicacionDto } from './dto/search-ubicacion.dto';
import { PaginacionDto } from '../../common/dto/pagination.dto';
import { CrearUbicacionDto } from './dto/create-ubicacion.dto';
import { GeocodeUbicacionDto } from './dto/geocode-ubicacion.dto';
import { CodPostUbicacionDto } from './dto/codpostal-ubicacion.dto';

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

  @Post('/agregar')
  agregarUbicacion(@Body() payload: CrearUbicacionDto) {
    return this.ubicacionesService.agregarSiNoExiste(payload);
  }

  @Get('/geocode')
  obtenerGeocode(@Query() payload: GeocodeUbicacionDto) {
    return this.ubicacionesService.obtenerLatitudLongitud(payload);
  }

  @Get('/codigo/postal')
  obtenerDatosConCodigoPostal(@Query() payload: CodPostUbicacionDto) {
    return this.ubicacionesService.obtenerDatosConCodigoPostal(payload);
  }
}
