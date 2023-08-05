import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

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
}
