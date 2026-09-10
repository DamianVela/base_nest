import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
