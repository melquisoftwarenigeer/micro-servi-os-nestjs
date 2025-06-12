import { Controller, Get, Post, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService, private readonly http: HttpService) { }

  @Get()
  getAll() {
    return this.projectsService.findAll();
  }

  @Get('projec-jwt')
  async getProjects(@Headers('authorization') authHeader: string) {
    const AUTH_URL = process.env.AUTH_URL || 'http://localhost:3001';
    try {
      const response = await lastValueFrom(
        this.http.post(`${AUTH_URL}/auth/verify`, {}, { //comdocker
          headers: { Authorization: authHeader },
        })
      );

      if (response.data.valid) {
        return [{ id: 1, name: 'Projeto XPTO', owner: response.data.userId }];
      }

      throw new UnauthorizedException('Token inválido');
    } catch {
      throw new UnauthorizedException('Token inválido ou erro na verificação');
    }
  }

  @Post()
  create(@Body() body: { name: string; ownerId: string }) {
    return this.projectsService.create(body);
  }
}
