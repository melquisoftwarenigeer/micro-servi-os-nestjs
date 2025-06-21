import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Headers,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import * as jwt from 'jsonwebtoken';
import { InternalJwtGuard } from 'src/token/internal-jwt.guard';

@UseGuards(InternalJwtGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly service: TaskService) { }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Headers('Authorization') auth: string, @Body() dto: CreateTaskDto) {
    return this.service.create(dto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async list(@Headers('Authorization') auth: string, @Query('projectId') projectId?: number) {
    if (projectId) return this.service.findByProject(projectId);
    return this.service.findByFilter({});
  }
}
