import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { SearchRolDto } from './dto/search-rol.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@Controller('rrhh/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  getAllRoles(@Query() searchRolDto: SearchRolDto) {
    return this.rolesService.findAll(searchRolDto);
  }

  @Get(':idrol')
  @UseGuards(JwtAuthGuard)
  getRolById(@Param('idrol', ParseIntPipe) idrol: number) {
    return this.rolesService.findByPk(idrol);
  }
}
