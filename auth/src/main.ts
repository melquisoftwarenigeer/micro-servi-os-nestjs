import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';

async function bootstrap() {
  const isDocker = fs.existsSync('/.dockerenv');
  const AUTH_PORT = isDocker ? (process.env.AUTH_PORT || 3000) : 3001;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());  // Aplica o ValidationPipe globalmente
  await app.listen(AUTH_PORT);
}
bootstrap(); 
