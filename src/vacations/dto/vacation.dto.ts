import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt, IsNotEmpty, IsDate, IsOptional } from 'class-validator';

export class VacationDto {
  @IsInt()
  @IsOptional()
  employeeId: number;

  @IsDate()
  @IsNotEmpty()
  @Transform((params: TransformFnParams) => new Date(params.value))
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  @Transform((params: TransformFnParams) => new Date(params.value))
  endDate: Date;
}
