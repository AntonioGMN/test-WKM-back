import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
//import { PrismaService } from 'src/database/database.service';
import dayjs from 'dayjs';

interface Vacations {
  startDate: Date;
  endDate: Date;
}

@Injectable()
export class VacationsService {
  //constructor(private readonly prisma: PrismaService) {}

  async validations(vacations: Vacations[]): Promise<void> {
    const vacationDaysForPerid = vacations.map((v) => {
      const start = dayjs(v.startDate);
      const end = dayjs(v.endDate);
      if (start.isAfter(end))
        throw new ForbiddenException(
          'A data de termino das ferias precisa ser apos a de inicio',
        );
      return end.diff(start, 'days') + 1;
    });

    const totalVacationDays = vacationDaysForPerid.reduce(
      (sum, v) => sum + v,
      0,
    );

    if (totalVacationDays > 30)
      throw new ForbiddenException(
        'Não é permitido cadastrar mais que 30 dias de férias',
      );

    if (vacationDaysForPerid.some((v) => v < 5))
      throw new ForbiddenException(
        'Não é permitido cadastrar um período de férias com duração menor que 5 dias',
      );

    if (
      vacationDaysForPerid.length > 1 &&
      vacationDaysForPerid.every((v) => v < 14)
    )
      throw new ForbiddenException(
        'Quando você divide sua férias, ao menos um período tem que ter mais que 14 dias',
      );
  }
}
