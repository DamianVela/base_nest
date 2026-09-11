import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../common/decorators/roles.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const nivelesPermitidos = this.reflector.getAllAndOverride<number[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!nivelesPermitidos) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const usuario = request.user as JwtPayload;
    if (!usuario) {
      throw new ForbiddenException('No se encontró el usuario autenticado.');
    }
    if (!nivelesPermitidos.includes(usuario.nivel)) {
      throw new ForbiddenException(
        'Acceso denegado. No tiene permisos suficientes.',
      );
    }
    return true;
  }
}
