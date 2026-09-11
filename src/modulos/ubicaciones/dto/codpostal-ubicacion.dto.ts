import { IsString, Matches } from 'class-validator';

export class CodPostUbicacionDto {
  @IsString({ message: 'El código postal debe ser string' })
  @Matches(/^\d{5}$/, {
    message: 'El código postal debe contener exactamente 5 dígitos',
  })
  readonly codigopostal: string;
}
