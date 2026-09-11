import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UbicacionesService } from './ubicaciones.service';
import { SearchUbicacionDto } from './dto/search-ubicacion.dto';
import { PaginacionDto } from '../../common/dto/pagination.dto';
import { CrearUbicacionDto } from './dto/create-ubicacion.dto';
import { GeocodeUbicacionDto } from './dto/geocode-ubicacion.dto';
import { CodPostUbicacionDto } from './dto/codpostal-ubicacion.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { JwtPayload } from '../../auth/interfaces/jwt-payload.interface';
import { Roles } from '../../common/decorators/roles.decorator';

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
  @UseGuards(JwtAuthGuard)
  @Roles(1)
  agregarUbicacion(
    @Body() payload: CrearUbicacionDto,
    @GetUser() usuario: JwtPayload,
  ) {
    return this.ubicacionesService.agregarSiNoExiste(payload, usuario);
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
