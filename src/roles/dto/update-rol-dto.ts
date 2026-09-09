import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateRolDto {
  @IsNumber()
  readonly IdRol: number;
  @IsString({ message: 'La descripción debe ser string' })
  @MinLength(1)
  @MaxLength(50)
  @IsOptional()
  readonly descripcion: string;
  @IsNumber()
  @IsOptional()
  readonly nivel?: number;
  @IsString({ message: 'El área debe ser string' })
  @MinLength(1)
  @MaxLength(2)
  @IsOptional()
  readonly area?: string;
}
