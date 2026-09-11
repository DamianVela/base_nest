import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class SearchLogHistorialDto {
  @IsOptional()
  @IsString({ message: 'La acción debe ser string' })
  @MinLength(1)
  @MaxLength(50)
  readonly accion?: string;

  @IsOptional()
  @IsString({ message: 'El subtítulo debe ser string' })
  @MinLength(1)
  @MaxLength(50)
  readonly subtitulo?: string;

  @IsOptional()
  @IsString({ message: 'El título debe ser string' })
  @MinLength(1)
  @MaxLength(50)
  readonly titulo?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly idrol?: number;
}
