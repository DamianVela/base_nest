import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CrearUbicacionDto {
  @IsString({ message: 'El pais debe ser string' })
  @MinLength(1)
  @MaxLength(32)
  readonly pais: string;

  @IsString({ message: 'El estado debe ser string' })
  @MinLength(1)
  @MaxLength(32)
  readonly estado: string;

  @IsString({ message: 'La calle debe ser string' })
  @MinLength(1)
  @MaxLength(32)
  readonly calle: string;

  @IsString({ message: 'El código postal debe ser string' })
  @Matches(/^\d{5}$/, {
    message: 'El código postal debe contener exactamente 5 dígitos',
  })
  readonly codigopostal: string;

  @IsString({ message: 'El número exterior debe ser string' })
  @MinLength(1)
  @MaxLength(16)
  readonly numeroexterior: string;

  @IsString({ message: 'El municipio debe ser string' })
  @MinLength(1)
  readonly municipio: string;

  @IsString({ message: 'La colonia debe ser string' })
  @MinLength(1)
  readonly colonia: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'La latitud debe ser un número' })
  @Min(-90)
  @Max(90)
  readonly latitud?: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'La longitud debe ser un número' })
  @Min(-180)
  @Max(180)
  readonly longitud?: number;
}
