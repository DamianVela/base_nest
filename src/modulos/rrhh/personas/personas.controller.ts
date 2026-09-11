import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PersonasService } from './personas.service';
import { SearchPersonaDto } from './dto/search-persona.dto';
import { PaginacionDto } from '../../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('rrhh/personas')
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(1)
  getAllPersonas(
    @Query() searchPersonaDto: SearchPersonaDto,
    paginacion: PaginacionDto,
  ) {
    return this.personasService.findAll(searchPersonaDto, paginacion);
  }

  @Get(':idpersona')
  @UseGuards(JwtAuthGuard)
  @Roles(1)
  getUbicacionById(@Param('idpersona', ParseIntPipe) idpersona: number) {
    return this.personasService.findByPk(idpersona);
  }
}
