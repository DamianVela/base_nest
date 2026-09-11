import {
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SearchLoginAttemptDto {
  @IsOptional()
  @IsString({ message: 'La dirección IP debe ser string' })
  @MinLength(1)
  @MaxLength(50)
  readonly dirip?: string;

  @IsOptional()
  @IsIn(['EXITOSO', 'FALLIDO'], {
    message: 'El estatus no está entre las opciones',
  })
  readonly estatus?: string;
}
