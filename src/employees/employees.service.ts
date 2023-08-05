import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.prisma.employees.findMany();
  }

  async findById(id: number): Promise<Employees> {
    return this.prisma.employees.findUnique({ where: { id } });
  }

  async create(
    employee: Prisma.EmployeesCreateInput,
    vacations: VacationDto[],
  ): Promise<void> {
    try {
      await this.prisma.$transaction(async (prisma) => {
        const { id: employeeId } = await prisma.employees.create({
          data: employee,
        });

        const data = vacations.map((vacation) => ({
          employeeId: employeeId,
          ...vacation,
        }));

        await prisma.vacations.createMany({ data });
      });
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Erro ao criar as férias.');
    }
  }

  async update(
    id: number,
    data: Prisma.EmployeesUpdateInput,
  ): Promise<Employees> {
    return this.prisma.employees.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Employees> {
    return this.prisma.employees.delete({ where: { id } });
  }
}
