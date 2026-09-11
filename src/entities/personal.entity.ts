import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rol } from './rol.entity';
import { Ubicacion } from './ubicacion.entity';
import bcrypt from 'bcrypt';

@Entity('PERSONAL')
export class Persona {
  @PrimaryGeneratedColumn()
  IdPersona: number;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
  })
  Celular: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  ApellidoPaterno: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  ApellidoMaterno: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  Nombres: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: true,
  })
  Usuario: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  Clave: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  FechaExpiracionClave: Date;

  @Column({
    type: 'int',
    nullable: false,
  })
  IdRol: number;

  @Column({
    type: 'bit',
    nullable: false,
    default: true,
  })
  Activo: boolean;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  Mail: string;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'GETDATE()',
  })
  FechaCreacion: Date;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  FechaIngreso: Date;

  @Column({
    type: 'varchar',
    length: 2048,
    nullable: true,
  })
  RutaImagen: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  FechaNacimiento: Date;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  RFC: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  NumEmpleado: number;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
  })
  NumImss: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  Curp: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  IdUbicacion: number;

  @BeforeInsert()
  async hashPassword() {
    this.Clave = await bcrypt.hash(this.Clave, 10);
  }

  // PERSONA → ROL
  @ManyToOne(() => Rol, (rol) => rol.personas)
  @JoinColumn({ name: 'IdRol' })
  rol: Rol;

  // PERSONA → UBICACIÓN
  @ManyToOne(() => Ubicacion, (ubicacion) => ubicacion.personal)
  @JoinColumn({ name: 'IdUbicacion' })
  ubicacion: Ubicacion;
}
