import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { VacationDto } from 'src/vacations/dto/vacation.dto';

export class CreateEmployeeDto {
  @IsNotEmpty({ message: 'O campo "name" não pode ser vazio' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'O campo "job" não pode ser vazio' })
  @IsString()
  job: string;

  @IsNotEmpty({ message: 'O campo "hireDate" não pode ser vazio' })
  @Transform((params: TransformFnParams) => new Date(params.value))
  hireDate: Date;

  @ValidateNested({ each: true })
  @Type(() => VacationDto)
  vacations: VacationDto[];
}
