import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRolDto {
  @IsString({ message: 'La descripción debe ser string' })
  @MinLength(1)
  @MaxLength(50)
  readonly descripcion: string;
  @IsNumber()
  readonly nivel: number;
  @IsString({ message: 'El área debe ser string' })
  @MinLength(1)
  @MaxLength(2)
  readonly area: string;
}
