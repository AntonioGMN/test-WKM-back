import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient, Vacations } from '@prisma/client';
import { PrismaService } from 'src/database/database.service';
import { VacationDto } from './dto/vacation.dto';

@Injectable()
export class VacationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(vacations: VacationDto[], employeeId: number): Promise<void> {
    const prisma = new PrismaClient(); // Cria uma nova instância do PrismaClient para a transação

    try {
      await prisma.$connect(); // Conecta com o banco de dados
      await prisma.$transaction(async (prisma) => {
        const data = vacations.map((vacation) => ({
          employeeId: employeeId,
          ...vacation,
        }));

        await prisma.vacations.createMany({ data });
      });
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Erro ao criar as férias.');
    } finally {
      await prisma.$disconnect(); // Fecha a conexão após a transação
    }
  }
}
