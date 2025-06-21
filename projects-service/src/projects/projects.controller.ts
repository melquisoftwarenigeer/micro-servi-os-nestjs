import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
  Headers,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CreateProjectDto } from './dto/project.dto';
import { InternalJwtGuard } from 'src/token/internal-jwt.guard';

@UseGuards(InternalJwtGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly service: ProjectsService) { }

  @Post()
  async create(@Body() dto: CreateProjectDto) {
    return this.service.create(dto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
}

//VERSAO 2
// @Controller('projects')
// export class ProjectController {
//   constructor(private readonly service: ProjectsService) {}

//   private isAuthenticated(auth: string): boolean {
//     return auth === 'Bearer mocked-jwt-token';
//   }

//   @Post()
//   @UsePipes(new ValidationPipe({ whitelist: true }))
//   async create(@Headers('Authorization') auth: string, @Body() dto: CreateProjectDto) {
//     if (!this.isAuthenticated(auth)) throw new UnauthorizedException();
//     return this.service.create(dto);
//   }

//   @Get()
//   async findAll(@Headers('Authorization') auth: string) {
//     if (!this.isAuthenticated(auth)) throw new UnauthorizedException();
//     return this.service.findAll();
//   }

//   @Get(':id')
//   async findOne(@Headers('Authorization') auth: string, @Param('id', ParseIntPipe) id: number) {
//     if (!this.isAuthenticated(auth)) throw new UnauthorizedException();
//     return this.service.findOne(id);
//   }
// }

//VERSAO 3
// @Controller('projects')
// export class ProjectsController {
//   constructor(
//     private readonly projectsService: ProjectsService,
//     private readonly http: HttpService,
//   ) { }

//   @Get()
//   getAll() {
//     return this.projectsService.findAll();
//   }

//   @Get('projec-jwt')
//   async getProjects(@Headers('authorization') authHeader: string) {
//     const AUTH_URL = process.env.AUTH_URL || 'http://localhost:3001';
//     try {
//       const response = await lastValueFrom(
//         this.http.post(`${AUTH_URL}/auth/verify`, {}, {
//           headers: { Authorization: authHeader },
//         })
//       );

//       if (response.data.valid) {
//         const projetos = await this.projectsService.findAll(); // Aqui está o ajuste
//         return [{
//           id: 1,
//           name: 'Projeto XPTO',
//           owner: response.data.userId,
//           projetos: projetos // opcionalmente pluralizar o nome
//         }];
//       }

//       throw new UnauthorizedException('Token inválido');
//     } catch {
//       throw new UnauthorizedException('Token inválido ou erro na verificação');
//     }
//   }

//   @Post()
//   create(@Body() createProjectDto: CreateProjectDto) {
//     return this.projectsService.create(createProjectDto);
//   }
// }
