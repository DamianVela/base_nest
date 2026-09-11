import {
  IsDateString,
  IsOptional,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'fechaInicioMenor', async: false })
class FechaInicioMenor implements ValidatorConstraintInterface {
  validate(fechaInicio: string, args: ValidationArguments) {
    const dto = args.object as FechasDto;
    if (!fechaInicio || !dto.fechafin) {
      return true;
    }
    return new Date(fechaInicio) < new Date(dto.fechafin);
  }
  defaultMessage() {
    return 'La fechaInicio debe ser menor que la fechaFin';
  }
}

export class FechasDto {
  @IsOptional()
  @IsDateString()
  @Validate(FechaInicioMenor)
  fechainicio?: string;

  @IsOptional()
  @IsDateString()
  fechafin?: string;
}
