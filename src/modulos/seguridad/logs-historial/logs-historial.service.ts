import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogHistorial } from '../../../entities/log-historial.entity';
import {
  Between,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { PaginacionDto } from '../../../common/dto/pagination.dto';
import { FechasDto } from '../../../common/dto/fechas.dto';
import { SearchLogHistorialDto } from './dto/search-log-historial.dto';
import { Rol } from '../../../entities/rol.entity';

@Injectable()
export class LogsHistorialService {
  constructor(
    @InjectRepository(LogHistorial)
    private readonly logsHistorialRepository: Repository<LogHistorial>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}
  async findAll(
    busqueda: SearchLogHistorialDto,
    paginacion: PaginacionDto,
    fechas: FechasDto,
  ) {
    const { idrol, subtitulo, titulo, accion } = busqueda;
    const { limit, offset } = paginacion;
    const { fechainicio, fechafin } = fechas;
    const whereClause: FindOptionsWhere<LogHistorial> = {};
    if (accion) {
      whereClause.Accion = accion;
    }
    if (subtitulo) {
      whereClause.SubTitulo = subtitulo;
    }
    if (titulo) {
      whereClause.Titulo = titulo;
    }
    if (fechainicio && fechafin) {
      whereClause.FechaCreacion = Between(
        new Date(fechainicio),
        new Date(fechafin),
      );
    } else if (fechainicio) {
      whereClause.FechaCreacion = MoreThanOrEqual(new Date(fechainicio));
    } else if (fechafin) {
      whereClause.FechaCreacion = LessThanOrEqual(new Date(fechafin));
    }
    if (idrol) {
      whereClause.persona = {
        rol: {
          IdRol: idrol,
        },
      };
    }
    const [logshistorial, total] =
      await this.logsHistorialRepository.findAndCount({
        where: whereClause,
        relations: {
          persona: {
            rol: true,
          },
        },
        select: {
          IdLog: true,
          Titulo: true,
          SubTitulo: true,
          Accion: true,
          Referencia: true,
          FechaCreacion: true,
          IdPersona: true,
          persona: {
            Nombres: true,
            rol: {
              Descripcion: true,
              IdRol: true,
            },
          },
        },
        order: {
          FechaCreacion: 'DESC',
        },
        take: limit,
        skip: offset,
      });
    const totalPaginas = Math.ceil(total / limit);
    return {
      total,
      totalPaginas,
      logshistorial,
    };
  }
  async obtenerTitulosRolesAcciones() {
    const titulos = await this.logsHistorialRepository
      .createQueryBuilder('log')
      .select('DISTINCT log.Titulo', 'Titulo')
      .getRawMany();
    const acciones = await this.logsHistorialRepository
      .createQueryBuilder('log')
      .select('DISTINCT log.Accion', 'Accion')
      .getRawMany();
    const roles = await this.rolRepository.find();
    return {
      titulos,
      roles,
      acciones,
    };
  }
  async obtenerSubTitulos(titulo: string) {
    const subtitulos = await this.logsHistorialRepository
      .createQueryBuilder('log')
      .select('DISTINCT log.SubTitulo', 'SubTitulo')
      .where('log.Titulo = :titulo', { titulo })
      .getRawMany();
    return {
      subtitulos,
    };
  }
}
