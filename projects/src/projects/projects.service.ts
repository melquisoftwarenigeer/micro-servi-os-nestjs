import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma'; // ajuste conforme a estrutura real da pasta

@Injectable()
export class ProjectsService {
  private prisma = new PrismaClient();

  async findAll() {
    return this.prisma.project.findMany();
  }

  async create(data: { name: string; ownerId: string }) {
    return this.prisma.project.create({ data });
  }
}
