import { Test, TestingModule } from '@nestjs/testing';
import { VacationsService } from './vacations.service';
import dayjs from 'dayjs';
import { ForbiddenException } from '@nestjs/common';

interface Vacations {
  startDate: Date;
  endDate: Date;
}

describe('VacationsService', () => {
  let service: VacationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacationsService],
    }).compile();

    service = module.get<VacationsService>(VacationsService);
  });

  it('Return forbidden when vacation finish date comes before the start date..', async () => {
    const vacations: Vacations[] = [
      {
        startDate: dayjs('2023-08-10').toDate(),
        endDate: dayjs('2023-08-05').toDate(),
      },
    ];

    await expect(service.validations(vacations)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('Return forbidden for more than 30 days of vacation.', async () => {
    const vacations: Vacations[] = [
      {
        startDate: dayjs('2023-08-01').toDate(),
        endDate: dayjs('2023-08-20').toDate(),
      },
      {
        startDate: dayjs('2023-08-21').toDate(),
        endDate: dayjs('2023-08-31').toDate(),
      },
    ];

    await expect(service.validations(vacations)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('Return forbidden if any vacation period is less than 5 days.', async () => {
    const vacations: Vacations[] = [
      {
        startDate: dayjs('2023-08-01').toDate(),
        endDate: dayjs('2023-08-04').toDate(),
      },
      {
        startDate: dayjs('2023-08-10').toDate(),
        endDate: dayjs('2023-08-31').toDate(),
      },
    ];

    await expect(service.validations(vacations)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('Return forbidden when none of the vacation periods have at least 14 days.', async () => {
    const vacations: Vacations[] = [
      {
        startDate: dayjs('2023-08-01').toDate(),
        endDate: dayjs('2023-08-08').toDate(),
      },
      {
        startDate: dayjs('2023-08-10').toDate(),
        endDate: dayjs('2023-08-19').toDate(),
      },
      {
        startDate: dayjs('2023-08-20').toDate(),
        endDate: dayjs('2023-08-26').toDate(),
      },
    ];

    await expect(service.validations(vacations)).rejects.toThrow(
      ForbiddenException,
    );
  });
});
