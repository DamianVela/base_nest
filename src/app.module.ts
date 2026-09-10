import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    RolesModule,
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
  ],
})
export class AppModule {}
