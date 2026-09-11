import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Persona } from './personal.entity';

@Entity('UBICACIONES')
export class Ubicacion {
  @PrimaryGeneratedColumn()
  IdUbicacion: number;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  Pais: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  Estado: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  Calle: string;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
  })
  CodigoPostal: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  Municipio: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  Colonia: string;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
  })
  NumeroExterior: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: false,
  })
  Latitud: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: false,
  })
  Longitud: number;

  @OneToMany(() => Persona, (persona) => persona.ubicacion) personal: Persona[];
}
