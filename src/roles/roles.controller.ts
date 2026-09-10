import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol-dto';
import { PaginacionDto } from '../common/dto/pagination.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get()
  getAllRoles(@Query() paginacion: PaginacionDto) {
    return this.rolesService.findAll(paginacion);
  }

  @Get(':idrol')
  getRolById(@Param('idrol', ParseIntPipe) idrol: number) {
    return this.rolesService.findByPk(idrol);
  }

  @Post()
  createRol(@Body() payload: CreateRolDto) {
    return this.rolesService.createRol(payload);
  }

  @Put(':idrol')
  updateRol(
    @Param('idrol', ParseIntPipe) idrol: number,
    @Body() payload: UpdateRolDto,
  ) {
    return this.rolesService.updateRol(idrol, payload);
  }

  @Delete(':idrol')
  deleteRol(@Param('idrol', ParseIntPipe) idrol: number) {
    return this.rolesService.deleteRol(idrol);
  }
}
