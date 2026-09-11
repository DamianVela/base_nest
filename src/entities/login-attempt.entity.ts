// login-attempt.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('LOGIN_ATTEMPTS')
export class LoginAttempt {
  @PrimaryGeneratedColumn()
  idLoginAttempt: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  Usuario: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  DirIp: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  Dispositivo: string;

  @Column({
    type: 'bit',
    nullable: true,
  })
  Exitoso: boolean;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'GETDATE()',
  })
  Fecha: Date;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  Razon: string;
}
