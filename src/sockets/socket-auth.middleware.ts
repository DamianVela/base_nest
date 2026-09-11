import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

export function socketAuthMiddleware(
  jwtService: JwtService,
  configService: ConfigService,
) {
  return (socket: Socket, next: (err?: Error) => void) => {
    const cookies = socket.handshake.headers.cookie;
    if (!cookies) {
      return next(new Error('No autorizado'));
    }
    const token = obtenerCookie(cookies, 'token');
    if (!token) {
      return next(new Error('No autorizado'));
    }
    try {
      const decoded = jwtService.verify(token, {
        secret: configService.get<string>('jwtSecret'),
      });
      socket.data.usuario = decoded;
      next();
    } catch {
      next(new Error('Token inválido'));
    }
  };
}

function obtenerCookie(cookies: string, nombre: string): string | null {
  const cookie = cookies
    .split(';')
    .find((item) => item.trim().startsWith(`${nombre}=`));
  if (!cookie) {
    return null;
  }
  return cookie.split('=').slice(1).join('=').trim();
}
