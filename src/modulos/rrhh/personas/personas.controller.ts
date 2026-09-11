import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { SearchPersonaDto } from './dto/search-persona.dto';
import { PaginacionDto } from '../../../common/dto/pagination.dto';

@Controller('rrhh/personas')
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}
  @Get()
  getAllPersonas(
    @Query() searchPersonaDto: SearchPersonaDto,
    paginacion: PaginacionDto,
  ) {
    return this.personasService.findAll(searchPersonaDto, paginacion);
  }

  @Get(':idpersona')
  getUbicacionById(@Param('idpersona', ParseIntPipe) idpersona: number) {
    return this.personasService.findByPk(idpersona);
  }
}
