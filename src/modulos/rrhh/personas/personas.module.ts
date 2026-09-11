import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from '../../../entities/personal.entity';
import { AuthModule } from '../../../auth/auth.module';

@Module({
  controllers: [PersonasController],
  providers: [PersonasService],
  imports: [TypeOrmModule.forFeature([Persona]), AuthModule],
})
export class PersonasModule {}
