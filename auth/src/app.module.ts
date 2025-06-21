import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProjectsGatewayController } from './routeGateway/projects/ProjectsGateway.controller';
import { TasksGatewayController } from './routeGateway/task/TasksGateway.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { TokenModule } from './token/token.module'; // 👈

@Module({
  imports: [HttpModule, AuthModule, TokenModule],
  controllers: [ProjectsGatewayController, TasksGatewayController, AppController],
  providers: [AppService],
})
export class AppModule { }
