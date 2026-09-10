import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EnvConfiguration } from './config/env.config';
import { EnvValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfiguration],
      validationSchema: EnvValidationSchema,
    }),
    RolesModule,
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
  ],
})
export class AppModule {}
