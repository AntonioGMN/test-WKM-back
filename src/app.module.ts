import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/database.service';
import { EmployeesService } from './employees/employees.service';
import { EmployeesModule } from './employees/employees.module';
import { VacationsService } from './vacations/vacations.service';

@Module({
  imports: [EmployeesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, EmployeesService, VacationsService],
})
export class AppModule {}
