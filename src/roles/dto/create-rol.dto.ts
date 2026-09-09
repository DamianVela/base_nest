import { IsNumber, IsString } from 'class-validator';

export class CreateRolDto {
  @IsString({ message: 'La descripción debe ser string' })
  readonly descripcion: string;
  @IsNumber()
  readonly nivel: number;
  @IsString({ message: 'El área debe ser string' })
  readonly area: string;
}
