import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
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
  async create(@Body() data: CreateEmployeeDto, @Res() res) {
    const vacations = data.vacations;
    const employee = {
      name: data.name,
      job: data.job,
      hireDate: data.hireDate,
    };

    try {
      await this.employeesService.create(employee, vacations);

      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Funcionário criado com sucesso!', data: employee });
    } catch (error) {
      return res.status(error.status).json({
        message: error.message,
      });
    }
  }
}
