import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginacionDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly pagina: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly limit: number = 10;

  get offset(): number {
    return (this.pagina - 1) * this.limit;
  }
}
