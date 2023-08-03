import { Injectable } from '@nestjs/common';
import { Prisma, Employees } from '@prisma/client';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Employees[]> {
    return this.prisma.employees.findMany();
  }

  async findById(id: number): Promise<Employees> {
    return this.prisma.employees.findUnique({ where: { id } });
  }

  async create(data: Prisma.EmployeesCreateInput): Promise<Employees> {
    return this.prisma.employees.create({ data });
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
