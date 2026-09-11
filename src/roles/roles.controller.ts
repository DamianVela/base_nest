import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { SearchRolDto } from './dto/search-rol.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get()
  getAllRoles(@Query() searchRolDto: SearchRolDto) {
    return this.rolesService.findAll(searchRolDto);
  }

  @Get(':idrol')
  getRolById(@Param('idrol', ParseIntPipe) idrol: number) {
    return this.rolesService.findByPk(idrol);
  }
}
