import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EnvConfiguration } from './config/env.config';
import { EnvValidationSchema } from './config/joi.validation';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
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
        autoLoadEntities: false,
        synchronize: false,
      }),
    }),
    RolesModule,
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
  ],
})
export class AppModule {}
