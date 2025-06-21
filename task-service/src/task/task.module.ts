import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaModule } from '../prisma/prisma.module'; // ajuste o caminho conforme necessário

@Module({
  imports: [PrismaModule], 
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
