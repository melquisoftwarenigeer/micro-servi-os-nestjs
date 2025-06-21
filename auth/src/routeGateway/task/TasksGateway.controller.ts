import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Headers,
  UseGuards,
  ValidationPipe,
  UsePipes,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import * as fs from 'fs';
import { InternalAuthService } from 'src/token/internal-auth.service';


@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
@UseGuards(AuthGuard('jwt')) // Autenticação externa (usuário)
@Controller('tasks')
export class TasksGatewayController {
  constructor(
    private readonly httpService: HttpService,
    private readonly internalAuthService: InternalAuthService,
  ) { }

  private baseUrl = process.env.SERVICE_TASK!; // Ex: http://tasks:3000/tasks

  @Post()
  async create(@Body() dto: any) {
    const token = this.internalAuthService.generateInternalToken();
    const response = await firstValueFrom(
      this.httpService.post(this.baseUrl, dto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
    return response.data;
  }

  @Get()
  async findAll(@Query('projectId') projectId?: number) {
    const token = this.internalAuthService.generateInternalToken();
    const response = await firstValueFrom(
      this.httpService.get(this.baseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          ...(projectId ? { projectId } : {}),
        },
      }),
    );
    return response.data;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const token = this.internalAuthService.generateInternalToken();
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );

    if (!response.data) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada.`);
    }

    return response.data;
  }
}