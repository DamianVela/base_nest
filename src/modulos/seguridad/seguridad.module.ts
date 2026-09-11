import { Module } from '@nestjs/common';
import { LogsHistorialModule } from './logs-historial/logs-historial.module';
import { LoginAttemptsModule } from './login-attempts/login-attempts.module';

@Module({
  imports: [LogsHistorialModule, LoginAttemptsModule],
})
export class SeguridadModule {}
