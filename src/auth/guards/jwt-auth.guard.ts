import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.obtenerToken(request);
    if (!token) {
      throw new UnauthorizedException(
        'Acceso denegado. No se proporcionó un token.',
      );
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new UnauthorizedException(
        'Token no válido, vuelve a iniciar sesión.',
      );
    }
  }

  private obtenerToken(request: Request): string | null {
    const tokenCookie = request.cookies?.token;
    if (tokenCookie) {
      return tokenCookie;
    }
    const authorization = request.headers.authorization;
    if (authorization?.startsWith('Bearer ')) {
      return authorization.substring(7);
    }
    return null;
  }
}
