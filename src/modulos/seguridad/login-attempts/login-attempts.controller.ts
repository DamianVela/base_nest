import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LoginAttemptsService } from './login-attempts.service';
import { SearchLoginAttemptDto } from './dto/search-login-attempt.dto';
import { PaginacionDto } from '../../../common/dto/pagination.dto';
import { FechasDto } from '../../../common/dto/fechas.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@Controller('seguridad')
export class LoginAttemptsController {
  constructor(private readonly loginAttemptsService: LoginAttemptsService) {}
  @Get('/login/attempts')
  @UseGuards(JwtAuthGuard)
  @Roles(1)
  getAllLoginAttempts(
    @Query() searchLoginAttemptDto: SearchLoginAttemptDto,
    paginacion: PaginacionDto,
    fechas: FechasDto,
  ) {
    return this.loginAttemptsService.findAll(
      searchLoginAttemptDto,
      paginacion,
      fechas,
    );
  }

  @Get('/ips/maliciosas')
  getIntentosFallidosPorIp() {
    return this.loginAttemptsService.obtenerIntentosFallidosPorIP();
  }
}
