import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Prisma } from '../../generated/prisma';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateTaskDto) {
    if (dto.endDate && dto.startDate && new Date(dto.endDate) < new Date(dto.startDate)) {
      throw new BadRequestException('Data de fim não pode ser anterior à data de início.');
    }

    return this.prisma.task.create({
      data: {
        description: dto.description,
        projectId: dto.projectId,
        startDate: dto.startDate,
        endDate: dto.endDate,
        predecessorTaskId: dto.predecessorTaskId,
        status: dto.status ?? 'Nao_Concluida',
      },
    });
  }

  async findByProject(projectId: number) {
    return this.prisma.task.findMany({
      where: { projectId },
    });
  }

  async findByFilter(query: Partial<Prisma.TaskWhereInput>) {
    return this.prisma.task.findMany({
      where: query,
    });
  }
}
