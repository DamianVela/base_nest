import { Controller } from '@nestjs/common';
import { LogsHistorialService } from './logs-historial.service';

@Controller('logs-historial')
export class LogsHistorialController {
  constructor(private readonly logsHistorialService: LogsHistorialService) {}
}
