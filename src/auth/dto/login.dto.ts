import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'El usuario debe ser string' })
  @MinLength(1)
  @MaxLength(20)
  readonly usuario: string;

  @IsString({ message: 'La clave debe ser string' })
  @MinLength(1)
  @MaxLength(20)
  readonly clave: string;
}
