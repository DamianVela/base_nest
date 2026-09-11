import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Persona } from './personal.entity';

@Entity('LOGS_HISTORIAL')
export class LogHistorial {
  @PrimaryGeneratedColumn()
  IdLog: number;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  Titulo: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  SubTitulo: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  Accion: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  Referencia: string;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'GETDATE()',
  })
  FechaCreacion: Date;

  @Column({
    type: 'int',
    nullable: true,
  })
  IdPersona: number;

  @ManyToOne(() => Persona, {
    nullable: true,
  })
  @JoinColumn({
    name: 'IdPersona',
  })
  persona: Persona;
}
