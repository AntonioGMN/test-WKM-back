import { Module } from '@nestjs/common';
import { PrismaService } from './database/database.service';
import { EmployeesService } from './employees/employees.service';
import { EmployeesModule } from './employees/employees.module';
import { VacationsService } from './vacations/vacations.service';
import { EmployeesController } from './employees/employees.controller';

@Module({
  imports: [EmployeesModule],
  controllers: [],
  providers: [PrismaService, EmployeesService, VacationsService],
})
export class AppModule {}
