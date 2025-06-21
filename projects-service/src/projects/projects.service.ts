
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProjectDto) {
    const exists = await this.prisma.project.findUnique({
      where: { name: dto.name },
    });

    if (exists) {
      throw new Error('Projeto com esse nome já existe');
    }

    return this.prisma.project.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.project.findMany();
  }

  findOne(id: number) {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }
}
