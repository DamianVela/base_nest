import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from '../../../entities/personal.entity';
import { Like, Repository } from 'typeorm';
import { SearchPersonaDto } from './dto/search-persona.dto';
import { PaginacionDto } from '../../../common/dto/pagination.dto';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona)
    private readonly personasRepository: Repository<Persona>,
  ) {}
  async findAll(busqueda: SearchPersonaDto, paginacion: PaginacionDto) {
    const {
      nivel,
      area,
      numempleado,
      curp,
      numimss,
      rfc,
      mail,
      nombre,
      activo,
    } = busqueda;
    const { limit, offset } = paginacion;
    const [personas, total] = await this.personasRepository.findAndCount({
      relations: {
        rol: true,
        ubicacion: true,
      },
      where: {
        ...(numempleado !== undefined && {
          NumEmpleado: numempleado,
        }),
        ...(curp !== undefined && {
          Curp: Like(`%${curp}%`),
        }),
        ...(numimss !== undefined && {
          NumImss: Like(`%${numimss}%`),
        }),
        ...(rfc !== undefined && {
          RFC: Like(`%${rfc}%`),
        }),
        ...(mail !== undefined && {
          Mail: Like(`%${mail}%`),
        }),
        ...(nombre !== undefined && {
          Nombres: Like(`%${nombre}%`),
        }),
        ...(activo !== undefined &&
          activo !== null && {
            Activo: activo,
          }),
        rol: {
          ...(nivel !== undefined && {
            Nivel: nivel,
          }),

          ...(area !== undefined && {
            Area: area,
          }),
        },
      },
      take: limit,
      skip: offset,
    });
    const totalPaginas = Math.ceil(total / limit);
    return {
      total,
      totalPaginas,
      personas,
    };
  }
  async findByPk(id: number) {
    const persona = await this.personasRepository.findOne({
      where: {
        IdPersona: id,
      },
    });
    if (!persona) {
      throw new NotFoundException('No se encontró la persona');
    }
    return persona;
  }
}
