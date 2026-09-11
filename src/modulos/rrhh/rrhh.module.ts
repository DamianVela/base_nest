import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { PersonasModule } from './personas/personas.module';

@Module({
  imports: [RolesModule, PersonasModule],
})
export class RrhhModule {}
