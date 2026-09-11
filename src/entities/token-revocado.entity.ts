// token-revocado.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Persona } from './personal.entity';

@Entity('TOKENS_REVOCADOS')
export class TokenRevocado {
  @PrimaryGeneratedColumn()
  IdTokenRevocado: number;

  @Column({
    type: 'varchar',
    length: 36,
    unique: true,
    nullable: true,
  })
  Jti: string;

  @CreateDateColumn({
    type: 'date',
    default: () => 'GETDATE()',
  })
  FechaCreacion: Date;

  @Column({ type: 'int', nullable: true })
  IdPersona: number;

  @ManyToOne(() => Persona, { nullable: true })
  @JoinColumn({ name: 'IdPersona' })
  persona: Persona;
}
