import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from '../../../entities/permiso.entity';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permiso)
    private readonly permisoRepository: Repository<Permiso>,
  ) {}
  async findAll(idrol: number) {
    const permisos = await this.permisoRepository.find({
      where: {
        IdRol: idrol,
      },
    });
    return {
      permisos,
    };
  }
}
