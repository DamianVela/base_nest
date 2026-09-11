import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AgentesService {
  @Cron('23 20 * * *')
  async tareaNormalPrueba() {
    console.log('ESTA ES UNA PRUEBA');
  }
}
