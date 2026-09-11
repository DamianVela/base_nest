import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Ubicacion } from '../../entities/ubicacion.entity';
import { DataSource, Like, Repository } from 'typeorm';
import { SearchUbicacionDto } from './dto/search-ubicacion.dto';
import { PaginacionDto } from '../../common/dto/pagination.dto';
import { CrearUbicacionDto } from './dto/create-ubicacion.dto';
import { MapboxResponse } from './interfaces/mapbox.interface';
import { GeocodeUbicacionDto } from './dto/geocode-ubicacion.dto';
import { AxiosAdapter } from '../../common/adapters/axios.adapter';
import { CodPostUbicacionDto } from './dto/codpostal-ubicacion.dto';
import { MapboxPostalCodeResponse } from './interfaces/codpostal.interface';
import { JwtPayload } from '../../auth/interfaces/jwt-payload.interface';
import { LogHistorial } from '../../entities/log-historial.entity';

@Injectable()
export class UbicacionesService {
  constructor(
    @InjectRepository(Ubicacion)
    private readonly ubicacionRepository: Repository<Ubicacion>,
    private readonly dataSource: DataSource,
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
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
  async agregarSiNoExiste(ubicacion: CrearUbicacionDto, usuario: JwtPayload) {
    const {
      pais,
      estado,
      calle,
      codigopostal,
      municipio,
      colonia,
      latitud,
      longitud,
    } = ubicacion;
    const ubiE = await this.ubicacionRepository.findOne({
      where: {
        CodigoPostal: codigopostal,
        Pais: pais,
        Estado: estado,
        Municipio: municipio,
        Colonia: colonia,
        Calle: calle,
      },
    });
    if (ubiE) {
      return {
        ubicacion: {
          ...ubiE,
          coordenadas: [ubiE.Latitud, ubiE.Longitud],
        },
      };
    }
    return await this.dataSource.transaction(async (manager) => {
      const resultado = await manager.insert(Ubicacion, {
        CodigoPostal: codigopostal,
        Pais: pais,
        Estado: estado,
        Municipio: municipio,
        Colonia: colonia,
        Calle: calle,
        Latitud: latitud,
        Longitud: longitud,
      });
      const idUbicacion = resultado.identifiers[0].IdUbicacion;
      await manager.insert(LogHistorial, {
        Titulo: 'CATÁLOGOS',
        SubTitulo: 'UBICACIONES',
        Accion: 'CREAR',
        Referencia: `IdUbicacion: ${idUbicacion}`,
        IdPersona: usuario.id,
      });
      return {
        IdUbicacion: idUbicacion,
        ...resultado,
        coordenadas: [latitud, longitud],
      };
    });
  }
  async obtenerLatitudLongitud(ubicacion: GeocodeUbicacionDto) {
    const {
      pais,
      estado,
      calle,
      codigopostal,
      municipio,
      colonia,
      numeroexterior,
    } = ubicacion;
    const direccion = `${calle} ${numeroexterior || ''}, ${
      colonia || ''
    }, ${municipio || ''}, ${estado || ''}, ${pais || ''}, ${
      codigopostal || ''
    }`;
    const direccionFormateada = encodeURIComponent(direccion);
    const apiKey = this.configService.get<string>('mapboxApiKey');
    const url =
      `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
      `${direccionFormateada}.json?access_token=${apiKey}`;
    const data = await this.http.get<MapboxResponse>(url);
    if (!data.features || data.features.length === 0) {
      throw new NotFoundException(
        'No se encontraron coordenadas para la dirección proporcionada.',
      );
    }
    const [lng, lat] = data.features[0].geometry.coordinates;
    return {
      lat,
      lng,
    };
  }
  async obtenerDatosConCodigoPostal(ubicacion: CodPostUbicacionDto) {
    const { codigopostal } = ubicacion;
    const apiKey = this.configService.get<string>('mapboxApiKey');

    const url =
      `https://api.mapbox.com/search/geocode/v6/forward` +
      `?q=${encodeURIComponent(codigopostal)}` +
      `&country=mx,us` +
      `&types=postcode` +
      `&access_token=${apiKey}`;

    const data = await this.http.get<MapboxPostalCodeResponse>(url);
    if (!data.features || data.features.length === 0) {
      throw new NotFoundException(
        'No se encontraron resultados para ese código postal.',
      );
    }
    const feature = data.features[0];
    const context = feature.properties?.context || {};
    const pais = (context.country?.name || '').toUpperCase();
    const estado = (context.region?.name || '').toUpperCase();
    const municipio = context.place?.name || '';
    const colonia = null;
    const [lng, lat] = feature.geometry.coordinates;
    return {
      pais,
      estado,
      municipio,
      colonia,
      codigo_postal: codigopostal,
      coordenadas: {
        lat,
        lng,
      },
    };
  }
}
