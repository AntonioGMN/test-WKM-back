import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { PrismaService } from 'src/database/database.service';
import { VacationsService } from 'src/vacations/vacations.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, VacationsService, PrismaService],
})
export class EmployeesModule {}
