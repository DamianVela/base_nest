import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@Controller('rrhh/permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}
  @Get(':idrol')
  @UseGuards(JwtAuthGuard)
  getRolById(@Param('idrol', ParseIntPipe) idrol: number) {
    return this.permisosService.findAll(idrol);
  }
}
