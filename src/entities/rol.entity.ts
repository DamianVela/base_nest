import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Persona } from './personal.entity';

@Entity('ROLES')
export class Rol {
  @PrimaryGeneratedColumn()
  IdRol: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  Descripcion: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  Nivel: number;

  @Column({
    type: 'varchar',
    length: 2,
    nullable: false,
  })
  Area: string;

  @OneToMany(() => Persona, (persona) => persona.rol) personas: Persona[];
}
