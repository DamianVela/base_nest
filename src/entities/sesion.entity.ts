import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Persona } from './personal.entity';

@Entity('SESIONES')
export class Sesion {
  @PrimaryGeneratedColumn()
  IdSesion: number;

  @Column({ type: 'int', nullable: true })
  IdPersona: number;

  @Column({
    type: 'varchar',
    length: 'max',
    nullable: true,
  })
  RefreshToken: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Dispositivo: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  DirIp: string;

  @Column({
    type: 'bit',
    nullable: false,
    default: true,
  })
  Activa: boolean;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'GETDATE()',
  })
  FechaCreacion: Date;

  @Column({ type: 'datetime', nullable: true })
  FechaExpiracion: Date;

  @Column({ type: 'datetime', nullable: true })
  UltimaActividad: Date;

  @ManyToOne(() => Persona, { nullable: true })
  @JoinColumn({ name: 'IdPersona' })
  persona: Persona;
}
