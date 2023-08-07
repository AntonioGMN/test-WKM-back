import { Injectable } from '@nestjs/common';
import { Prisma, Employees } from '@prisma/client';
import { PrismaService } from 'src/database/database.service';
import { VacationDto } from 'src/vacations/dto/vacation.dto';
import { VacationsService } from 'src/vacations/vacations.service';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly vacationsService: VacationsService,
  ) {}

  async findAll(): Promise<Employees[]> {
    return this.prisma.employees.findMany({
      include: {
        vacations: true,
      },
    });
  }

  async create(
    employee: Prisma.EmployeesCreateInput,
    vacations: VacationDto[],
  ): Promise<void> {
    await this.prisma.$transaction(async (prisma) => {
      const { id: employeeId } = await prisma.employees.create({
        data: employee,
      });

      await this.vacationsService.validations(vacations);

      const data = vacations.map((vacation) => ({
        employeeId: employeeId,
        ...vacation,
      }));

      await prisma.vacations.createMany({ data });
    });
  }
}
