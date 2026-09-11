import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class SearchRolDto {
  @IsOptional()
  @IsString({ message: 'La descripción debe ser string' })
  @MinLength(1)
  @MaxLength(50)
  readonly descripcion?: string;

  @IsOptional()
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
