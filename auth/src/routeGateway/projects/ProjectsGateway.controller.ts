import { Controller, Get, Post, Body, Param, UseGuards, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // se já tiver
import { AuthGuard } from '@nestjs/passport';
import { catchError } from 'rxjs/operators';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { InternalAuthService } from 'src/token/internal-auth.service';

@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsGatewayController {
  constructor(
    private readonly httpService: HttpService,
    private readonly internalAuthService: InternalAuthService, // ✅ AQUI
  ) { }

  private baseUrl = process.env.SERVICE_PROJECTS!;

  @Post()
  async create(@Body() dto: any) {
    const token = this.internalAuthService.generateInternalToken(); // ✅ Gere o token aqui
    const response = await firstValueFrom(this.httpService.post(this.baseUrl, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }));
    return response.data;
  }

  @Get()
  async findAll() {
    const token = this.internalAuthService.generateInternalToken();
    const response = await firstValueFrom(this.httpService.get(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }));
    return response.data;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const token = this.internalAuthService.generateInternalToken();
    const response = await firstValueFrom(this.httpService.get(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }));
    if (!response.data) {
      throw new NotFoundException(`Projeto com ID ${id} não encontrado.`);
    }
    return response.data;
  }
  
  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   try {
  //     const response = await firstValueFrom(
  //       this.httpService.get(`${this.baseUrl}/${id}`).pipe(
  //         catchError((error: AxiosError) => {
  //           if (error.response?.status === 404) {
  //             throw new NotFoundException(`Projeto com ID ${id} não encontrado.`);
  //           }
  //           throw new InternalServerErrorException('Erro ao consultar o microserviço de projetos.');
  //         })
  //       )
  //     );
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   const response = await firstValueFrom(this.httpService.get(`${this.baseUrl}/${id}`));
  //   if (!response.data) {
  //     throw new NotFoundException(`Projeto com ID ${id} não encontrado.`);
  //   }
  //   return response.data;
  // }

}
