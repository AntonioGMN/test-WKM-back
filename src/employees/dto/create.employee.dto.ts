import { IsNotEmpty, IsDate, IsDateString } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  job: string;

  @IsNotEmpty()
  @IsDateString()
  hireDate: Date;
}
