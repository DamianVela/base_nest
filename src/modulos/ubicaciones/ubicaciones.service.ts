import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ubicacion } from '../../entities/ubicacion.entity';
import { Like, Repository } from 'typeorm';
import { SearchUbicacionDto } from './dto/search-ubicacion.dto';
import { PaginacionDto } from '../../common/dto/pagination.dto';

@Injectable()
export class UbicacionesService {
  constructor(
    @InjectRepository(Ubicacion)
    private readonly ubicacionRepository: Repository<Ubicacion>,
  ) {}
  async findAll(busqueda: SearchUbicacionDto, paginacion: PaginacionDto) {
    const { pais, estado, calle, codigopostal, municipio, colonia } = busqueda;
    const { limit, offset } = paginacion;
    const [ubicaciones, total] = await this.ubicacionRepository.findAndCount({
      where: {
        ...(codigopostal !== undefined && {
          CodigoPostal: codigopostal,
        }),
        ...(pais !== undefined && {
          Pais: Like(`%${pais}%`),
        }),
        ...(estado !== undefined && {
          Estado: Like(`%${estado}%`),
        }),
        ...(calle !== undefined && {
          Calle: Like(`%${calle}%`),
        }),
        ...(municipio !== undefined && {
          Municipio: Like(`%${municipio}%`),
        }),
        ...(colonia !== undefined && {
          Colonia: Like(`%${colonia}%`),
        }),
      },
      take: limit,
      skip: offset,
    });
    const totalPaginas = Math.ceil(total / limit);
    return {
      total,
      totalPaginas,
      ubicaciones,
    };
  }
}
