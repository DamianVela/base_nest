import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RrhhModule } from './modulos/rrhh/rrhh.module';
import { join } from 'path';
import { EnvConfiguration } from './config/env.config';
import { EnvValidationSchema } from './config/joi.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbicacionesModule } from './modulos/ubicaciones/ubicaciones.module';
import { AuthModule } from './auth/auth.module';
import { AgentesModule } from './agentes/agentes.module';
import { SocketsModule } from './sockets/sockets.module';
import { PermisosModule } from './modulos/rrhh/permisos/permisos.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfiguration],
      validationSchema: EnvValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('dbHost'),
        port: configService.get<number>('dbPort'),
        username: configService.get<string>('dbUser'),
        password: configService.get<string>('dbPassword'),
        database: configService.get<string>('dbName'),
        options: {
          encrypt: configService.get<boolean>('dbEncrypt'),
          trustServerCertificate: configService.get<boolean>(
            'dbTrustServerCertificate',
          ),
        },
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    RrhhModule,
    UbicacionesModule,
    AuthModule,
    AgentesModule,
    SocketsModule,
    PermisosModule,
  ],
})
export class AppModule {}
