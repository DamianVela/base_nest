import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Persona } from '../entities/personal.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { Sesion } from '../entities/sesion.entity';
import { LoginDto } from './dto/login.dto';
import { LoginAttempt } from '../entities/login-attempt.entity';
import { TokenRevocado } from '../entities/token-revocado.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Persona)
    private readonly personasRepository: Repository<Persona>,
    @InjectRepository(Sesion)
    private readonly sesionesRepository: Repository<Sesion>,
    @InjectRepository(LoginAttempt)
    private readonly loginAttemptRepository: Repository<LoginAttempt>,
    @InjectRepository(TokenRevocado)
    private readonly tokenRevocadoRepository: Repository<TokenRevocado>,
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async login(body: LoginDto, dirip: string, dispositivo: string) {
    const [persona, tokenPasado] = await Promise.all([
      //persona
      this.personasRepository.findOne({
        where: {
          Usuario: body.usuario,
        },
        relations: {
          rol: true,
        },
      }),
      //tokenPasado
      this.sesionesRepository.findOne({
        where: {
          Activa: true,
          persona: {
            Usuario: body.usuario,
          },
        },
        relations: {
          persona: true,
        },
      }),
    ]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!persona) {
      await this.registrarIntentoLogin(
        body.usuario,
        dirip,
        dispositivo,
        false,
        'Usuario o clave incorrecta',
      );
      throw new UnauthorizedException('Usuario o clave incorrecta');
    }
    if (!persona.Activo) {
      await this.registrarIntentoLogin(
        body.usuario,
        dirip,
        dispositivo,
        false,
        'El usuario no está activo',
      );
      throw new ForbiddenException('El usuario no está activo');
    }
    if (!persona.Clave) {
      await this.registrarIntentoLogin(
        body.usuario,
        dirip,
        dispositivo,
        false,
        'El usuario no tiene una contraseña configurada',
      );
      throw new UnauthorizedException(
        'El usuario no tiene una contraseña configurada',
      );
    }
    const coincide = await bcrypt.compare(body.clave, persona.Clave);
    if (!coincide) {
      await this.registrarIntentoLogin(
        body.usuario,
        dirip,
        dispositivo,
        false,
        'Usuario o clave incorrecta',
      );
      throw new UnauthorizedException('Usuario o clave incorrecta');
    }
    const payload: JwtPayload = {
      id: persona.IdPersona,
      usuario: persona.Usuario,
      rol: persona.rol.Descripcion,
      nivel: persona.rol.Nivel,
      idrol: persona.rol.IdRol,
      nombre: persona.Nombres,
    };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwtSecret'),
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(
      {
        id: persona.IdPersona,
        tipo: 'refresh',
      },
      {
        secret: this.configService.get<string>('jwtRefresh'),
        expiresIn: '7d',
      },
    );
    await this.loginExitoso(
      tokenPasado,
      persona,
      refreshToken,
      dirip,
      dispositivo,
      body.usuario,
    );
    return {
      token,
      refreshToken,
      persona: {
        IdPersona: persona.IdPersona,
        Nombre: persona.Nombres,
        Usuario: persona.Usuario,
        Rol: persona.rol.Descripcion,
        Nivel: persona.rol.Nivel,
        IdRol: persona.rol.IdRol,
      },
    };
  }
  async refreshToken(refreshToken: string | undefined) {
    if (!refreshToken) {
      throw new UnauthorizedException('No se proporcionó el refresh token');
    }
    let decoded: {
      id: number;
      tipo: string;
    };
    try {
      decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('jwtRefresh'),
      });
    } catch {
      throw new UnauthorizedException('Refresh token inválido');
    }
    if (decoded.tipo !== 'refresh') {
      throw new UnauthorizedException('Refresh token inválido');
    }
    const [persona, sesionActiva] = await Promise.all([
      //persona
      this.personasRepository.findOne({
        where: {
          IdPersona: decoded.id,
        },
        relations: {
          rol: true,
        },
      }),
      //sesionActiva
      this.sesionesRepository.findOne({
        where: {
          IdPersona: decoded.id,
          Activa: true,
        },
      }),
    ]);
    if (!sesionActiva) {
      throw new UnauthorizedException('Sesión inválida o cerrada');
    }
    if (sesionActiva.RefreshToken !== refreshToken) {
      throw new UnauthorizedException(
        `Sesión inválida. Estás conectado en: ${sesionActiva.Dispositivo}. Vuelve a iniciar sesión.`,
      );
    }
    if (!persona) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    if (!persona.Activo) {
      throw new UnauthorizedException('El usuario no está activo');
    }

    const payload: JwtPayload = {
      id: persona.IdPersona,
      usuario: persona.Usuario,
      rol: persona.rol.Descripcion,
      nivel: persona.rol.Nivel,
      idrol: persona.rol.IdRol,
      nombre: persona.Nombres,
    };

    const newAccessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwtSecret'),
      expiresIn: '15m',
    });

    sesionActiva.UltimaActividad = new Date();
    await this.sesionesRepository.save(sesionActiva);

    return {
      token: newAccessToken,

      persona: {
        IdPersona: persona.IdPersona,
        Nombre: persona.Nombres,
        Usuario: persona.Usuario,
        Rol: persona.rol.Descripcion,
        Nivel: persona.rol.Nivel,
        IdRol: persona.rol.IdRol,
      },
    };
  }

  async logout(refreshToken: string | undefined) {
    if (!refreshToken) {
      return;
    }
    const sesion = await this.sesionesRepository.findOne({
      where: {
        RefreshToken: refreshToken,
      },
    });
    if (!sesion) {
      return;
    }
    sesion.Activa = false;
    await this.sesionesRepository.save(sesion);
  }

  private async registrarIntentoLogin(
    usuario: string,
    dirip: string | null,
    dispositivo: string | null,
    exitoso: boolean,
    razon: string,
  ) {
    await this.loginAttemptRepository.insert({
      Usuario: usuario,
      DirIp: dirip,
      Dispositivo: dispositivo,
      Exitoso: exitoso,
      Razon: razon,
    });
  }

  private async loginExitoso(
    tokenPasado: Sesion | null,
    persona: Persona,
    refreshToken: string,
    dirip: string | null,
    dispositivo: string | null,
    usuario: string,
  ) {
    const expiracion = new Date();
    expiracion.setDate(expiracion.getDate() + 7);
    return this.dataSource.transaction(async (manager) => {
      if (tokenPasado !== null) {
        await manager.update(
          Sesion,
          {
            IdPersona: persona.IdPersona,
          },
          {
            Activa: false,
          },
        );
      }
      await manager.insert(Sesion, {
        IdPersona: persona.IdPersona,
        RefreshToken: refreshToken,
        DirIp: dirip,
        Dispositivo: dispositivo,
        FechaExpiracion: expiracion,
        Activa: true,
      });
      await manager.insert(LoginAttempt, {
        Usuario: usuario,
        DirIp: dirip,
        Dispositivo: dispositivo,
        Exitoso: true,
      });
    });
  }
}
