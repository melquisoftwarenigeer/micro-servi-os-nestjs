import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';

async function bootstrap() {
  const isDocker = fs.existsSync('/.dockerenv');
  const PROJECTS_PORT = isDocker ? (process.env.PROJECTS_PORT || 3000) : 3002;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // ou defina ['http://localhost:8080'] para maior segurança
    credentials: true
  });
  // app.useGlobalPipes(new ValidationPipe());  // Aplica o ValidationPipe globalmente
  await app.listen(PROJECTS_PORT);
}
bootstrap();
