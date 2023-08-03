import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './database/database.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    const employees = this.prisma.employees.findMany();

    return this.appService.getHello();
  }
}
