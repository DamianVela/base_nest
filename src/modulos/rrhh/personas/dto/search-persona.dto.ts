import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class SearchPersonaDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El número de empleado debe ser un entero' })
  @Min(1)
  readonly numempleado?: number;

  @IsOptional()
  @IsString({ message: 'El curp debe ser string' })
  @MinLength(1)
  readonly curp?: string;

  @IsOptional()
  @IsString({ message: 'El número del imss debe ser string' })
  @MinLength(1)
  readonly numimss?: string;

  @IsOptional()
  @IsString({ message: 'El mail debe ser string' })
  @MinLength(1)
  readonly rfc?: string;

  @IsOptional()
  @IsString({ message: 'El mail debe ser string' })
  @MinLength(1)
  readonly mail?: string;

  @IsOptional()
  @IsString({ message: 'El nombre debe ser string' })
  @MinLength(1)
  readonly nombre?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === null || value === undefined) {
      return value;
    }
    return value === 'true' || value === true;
  })
  @IsBoolean()
  readonly activo?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El nivel debe ser un entero' })
  @Min(1)
  readonly nivel?: number;

  @IsOptional()
  @IsIn(
    [
      'AD',
      'AL',
      'CO',
      'GU',
      'IT',
      'LO',
      'MA',
      'MN',
      'MO',
      'OP',
      'PA',
      'RH',
      'TR',
    ],
    {
      message: 'El área no está entre las opciones',
    },
  )
  readonly area?: string;
}
