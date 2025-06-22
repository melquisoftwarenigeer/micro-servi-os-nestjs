import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';

async function bootstrap() {
  const isDocker = fs.existsSync('/.dockerenv');
  const AUTH_PORT = isDocker ? (process.env.AUTH_PORT || 3000) : 3001;
  const app = await NestFactory.create(AppModule);
  // Habilita CORS para qualquer origem
  app.enableCors({
    origin: '*', // ou defina ['http://localhost:8080'] para maior segurança
    credentials: true
  });
  console.log('🧪 INTERNAL_JWT_SECRET_AUTH:', process.env.INTERNAL_JWT_SECRET);
  app.useGlobalPipes(new ValidationPipe());  // Aplica o ValidationPipe globalmente
  await app.listen(AUTH_PORT);
}
bootstrap(); 
