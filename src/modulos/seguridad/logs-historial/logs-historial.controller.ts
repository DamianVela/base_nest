import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LogsHistorialService } from './logs-historial.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { SearchLogHistorialDto } from './dto/search-log-historial.dto';
import { PaginacionDto } from '../../../common/dto/pagination.dto';
import { FechasDto } from '../../../common/dto/fechas.dto';

@Controller('seguridad')
export class LogsHistorialController {
  constructor(private readonly logsHistorialService: LogsHistorialService) {}
  @Get('/logs/historial')
  @UseGuards(JwtAuthGuard)
  @Roles(1)
  getAllLogsHistorial(
    @Query() searchLogHistorialDto: SearchLogHistorialDto,
    paginacion: PaginacionDto,
    fechas: FechasDto,
  ) {
    return this.logsHistorialService.findAll(
      searchLogHistorialDto,
      paginacion,
      fechas,
    );
  }

  @Get('/filtros/logs')
  @UseGuards(JwtAuthGuard)
  @Roles(1)
  getFiltrosLogs() {
    return this.logsHistorialService.obtenerTitulosRolesAcciones();
  }

  @Get('/subtitulos/logs')
  @UseGuards(JwtAuthGuard)
  @Roles(1)
  getSubtitulos(@Query() titulo: string) {
    return this.logsHistorialService.obtenerSubTitulos(titulo);
  }
}
