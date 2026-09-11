import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rol } from './rol.entity';

@Entity('PERMISOS')
export class Permiso {
  @PrimaryGeneratedColumn()
  IdPermiso: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  NombreMenu: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  IdRol: number;

  // PERMISO → ROL
  @ManyToOne(() => Rol, (rol) => rol.permisos)
  @JoinColumn({ name: 'IdRol' })
  rol: Rol;
}
