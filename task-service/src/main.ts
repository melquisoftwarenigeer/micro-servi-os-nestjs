import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';

async function bootstrap() {
  const isDocker = fs.existsSync('/.dockerenv');
  const TASKS_PORT = isDocker ? 3000 : 3003;
  const AUTH_ORIGIN = isDocker ? 'http://auth:3000' : 'http://localhost:3001';

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: AUTH_ORIGIN,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
  // Bloqueia qualquer requisição sem token (curl, Postman, navegador, etc.)
  // app.use(new InternalAuthMiddleware().use);

  app.useGlobalPipes(new ValidationPipe());  // Aplica o ValidationPipe globalmente

  await app.listen(TASKS_PORT);
}
bootstrap();
