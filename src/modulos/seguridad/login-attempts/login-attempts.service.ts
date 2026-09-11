import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAttempt } from '../../../entities/login-attempt.entity';
import {
  Between,
  FindOptionsWhere,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { SearchLoginAttemptDto } from './dto/search-login-attempt.dto';
import { PaginacionDto } from '../../../common/dto/pagination.dto';
import { FechasDto } from '../../../common/dto/fechas.dto';
import { IntentosFallidosPorIp } from './interface/intentos-fallidos.interface';

@Injectable()
export class LoginAttemptsService {
  constructor(
    @InjectRepository(LoginAttempt)
    private readonly loginAttemptRepository: Repository<LoginAttempt>,
  ) {}
  async findAll(
    busqueda: SearchLoginAttemptDto,
    paginacion: PaginacionDto,
    fechas: FechasDto,
  ) {
    const { dirip, estatus } = busqueda;
    const { limit, offset } = paginacion;
    const { fechainicio, fechafin } = fechas;
    const whereClause: FindOptionsWhere<LoginAttempt> = {};
    if (dirip) {
      whereClause.DirIp = Like(`%${dirip}%`);
    }
    if (estatus === 'EXITOSO') {
      whereClause.Exitoso = true;
    }
    if (estatus === 'FALLIDO') {
      whereClause.Exitoso = false;
    }
    if (fechainicio && fechafin) {
      whereClause.Fecha = Between(new Date(fechainicio), new Date(fechafin));
    } else if (fechainicio) {
      whereClause.Fecha = MoreThanOrEqual(new Date(fechainicio));
    } else if (fechafin) {
      whereClause.Fecha = LessThanOrEqual(new Date(fechafin));
    }
    const [logins, total] = await this.loginAttemptRepository.findAndCount({
      where: whereClause,
      take: limit,
      skip: offset,
    });
    const totalPaginas = Math.ceil(total / limit);
    return {
      total,
      totalPaginas,
      logins,
    };
  }
  async obtenerIntentosFallidosPorIP(): Promise<IntentosFallidosPorIp[]> {
    const haceUnMes = new Date();
    haceUnMes.setMonth(haceUnMes.getMonth() - 1);
    return await this.loginAttemptRepository
      .createQueryBuilder('login')
      .select('login.DirIp', 'DirIp')
      .addSelect('COUNT(login.IdLoginAttempt)', 'cantidadIntentos')
      .addSelect('MAX(login.Fecha)', 'ultimoIntento')
      .where('login.Exitoso = :exitoso', {
        exitoso: false,
      })
      .andWhere('login.DirIp IS NOT NULL')
      .andWhere('login.Fecha >= :fecha', {
        fecha: haceUnMes,
      })
      .groupBy('login.DirIp')
      .having('COUNT(login.IdLoginAttempt) >= :cantidad', {
        cantidad: 5,
      })
      .orderBy('cantidadIntentos', 'DESC')
      .getRawMany();
  }
}
