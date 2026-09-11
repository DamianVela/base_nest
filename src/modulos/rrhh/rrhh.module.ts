import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { PersonasModule } from './personas/personas.module';
import { PermisosModule } from './permisos/permisos.module';

@Module({
  imports: [RolesModule, PersonasModule, PermisosModule],
})
export class RrhhModule {}
