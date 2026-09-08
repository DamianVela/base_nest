import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class RolesService {
  private roles = [
    {
      id: 1,
      descripcion: 'Operador',
    },
    {
      id: 1,
      descripcion: 'Admin',
    },
  ];
  findAll() {
    return this.roles;
  }
  findByPk(id: number) {
    const rol = this.roles.find((r) => r.id === id);
    if (!rol) {
      throw new NotFoundException('No se encontró el rol');
    }
    return rol;
  }
}
