import { Injectable, NotFoundException } from '@nestjs/common';
import { Rol } from './interfaces/rol.interface';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol-dto';
import { PaginacionDto } from '../common/dto/pagination.dto';

@Injectable()
export class RolesService {
  private roles: Rol[] = [
    {
      IdRol: 2,
      Descripcion: 'Operador',
      Nivel: 9,
      Area: 'OP',
    },
    {
      IdRol: 1,
      Descripcion: 'Admin',
      Nivel: 1,
      Area: 'AD',
    },
  ];
  findAll(paginacion: PaginacionDto) {
    console.log(paginacion);
    return this.roles;
  }
  findByPk(id: number) {
    const rol = this.roles.find((r) => r.IdRol === id);
    if (!rol) {
      throw new NotFoundException('No se encontró el rol');
    }
    return rol;
  }
  createRol(createRolDto: CreateRolDto) {
    const rol: Rol = {
      IdRol: 3,
      Descripcion: createRolDto.descripcion,
      Nivel: createRolDto.nivel,
      Area: createRolDto.area,
    };
    this.roles.push(rol);
    return rol;
  }
  updateRol(idrol: number, updateRolDto: UpdateRolDto) {
    const rolDB = this.findByPk(idrol);
    const rol: Rol = {
      IdRol: rolDB.IdRol,
      Descripcion: updateRolDto.descripcion,
      Nivel: updateRolDto.nivel,
      Area: updateRolDto.area,
    };
    this.roles.push(rol);
    return rol;
  }
  deleteRol(idrol: number) {
    const rolDB = this.findByPk(idrol);
    return rolDB;
  }
}
