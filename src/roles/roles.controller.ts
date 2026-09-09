import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-rol.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get()
  getAllRoles() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  getRolById(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.findByPk(id);
  }

  @Post()
  createRol(@Body() payload: CreateRolDto) {
    return payload;
  }
}
