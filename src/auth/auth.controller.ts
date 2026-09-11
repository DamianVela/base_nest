import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GetIp } from '../common/decorators/get-ip.decorator';
import { GetUserAgent } from '../common/decorators/get-user-agent.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() payload: LoginDto,
    @Res({ passthrough: true }) response: Response,
    @GetIp() dirip: string | null,
    @GetUserAgent() dispo: string | null,
  ) {
    const resultado = await this.authService.login(payload, dirip, dispo);
    response.cookie('token', resultado.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 15 * 60 * 1000,
    });
    response.cookie('refresh_token', resultado.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return resultado;
  }

  @Post('refresh')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.refresh_token;
    const resultado = await this.authService.refreshToken(refreshToken);
    response.cookie('token', resultado.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 15 * 60 * 1000,
    });
    return resultado;
  }

  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.refresh_token;
    await this.authService.logout(refreshToken);
    response.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    response.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/auth/refresh',
    });
    return {
      message: 'Logout exitoso',
    };
  }
}
