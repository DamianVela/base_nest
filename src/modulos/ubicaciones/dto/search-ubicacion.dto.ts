import { IsOptional, IsString, MinLength } from 'class-validator';

export class SearchUbicacionDto {
  @IsOptional()
  @IsString({ message: 'El pais debe ser string' })
  @MinLength(1)
  readonly pais?: string;

  @IsOptional()
  @IsString({ message: 'El estado debe ser string' })
  @MinLength(1)
  readonly estado?: string;

  @IsOptional()
  @IsString({ message: 'La calle debe ser string' })
  @MinLength(1)
  readonly calle?: string;

  @IsOptional()
  @IsString({ message: 'El código postal debe ser string' })
  @MinLength(1)
  readonly codigopostal?: string;

  @IsOptional()
  @IsString({ message: 'El municipio debe ser string' })
  @MinLength(1)
  readonly municipio?: string;

  @IsOptional()
  @IsString({ message: 'La colonia debe ser string' })
  @MinLength(1)
  readonly colonia?: string;
}
