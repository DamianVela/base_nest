import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from '../entities/rol.entity';
import { Repository } from 'typeorm';
import { SearchRolDto } from './dto/search-rol.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolesRepository: Repository<Rol>,
  ) {}
  async findAll(busqueda: SearchRolDto) {
    const { descripcion, nivel, area } = busqueda;
    const roles = await this.rolesRepository.find({
      where: {
        ...(descripcion && { Descripcion: descripcion }),
        ...(nivel && { Nivel: nivel }),
        ...(area && { Area: area }),
      },
    });
    return {
      roles,
    };
  }
  async findByPk(id: number) {
    const rol = await this.rolesRepository.findOne({
      where: {
        IdRol: id,
      },
    });
    if (!rol) {
      throw new NotFoundException('No se encontró el rol');
    }
    return rol;
  }
}
