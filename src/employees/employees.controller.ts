import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create.employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  getAllEmployees() {
    return this.employeesService.findAll();
  }

  @Post()
  create(@Body() data: CreateEmployeeDto) {
    const vacations = data.vacations;
    const employee = {
      name: data.name,
      job: data.job,
      hireDate: data.hireDate,
    };

    return this.employeesService.create(employee, vacations);
  }
}
