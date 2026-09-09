import { Injectable, NotFoundException } from '@nestjs/common';
import { Rol } from './interfaces/rol.interface';

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
  findAll() {
    return this.roles;
  }
  findByPk(id: number) {
    const rol = this.roles.find((r) => r.IdRol === id);
    if (!rol) {
      throw new NotFoundException('No se encontró el rol');
    }
    return rol;
  }
}
