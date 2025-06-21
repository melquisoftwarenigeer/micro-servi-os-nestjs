import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectController } from './projects.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [ProjectController],
  providers: [ProjectsService],
})
export class ProjectsModule { }
