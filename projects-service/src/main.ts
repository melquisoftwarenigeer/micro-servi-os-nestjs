import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';

async function bootstrap() {
  const isDocker = fs.existsSync('/.dockerenv');
  const PROJECTS_PORT = isDocker ? 3000 : 3002;
  const AUTH_ORIGIN = isDocker ? 'http://auth:3000' : 'http://localhost:3001';

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: AUTH_ORIGIN,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
  
  // Bloqueia qualquer requisição sem token (curl, Postman, navegador, etc.)
  // app.use(new InternalAuthMiddleware().use);
  console.log('🧪 INTERNAL_JWT_SECRET_PROJECTS:', process.env.INTERNAL_JWT_SECRET);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PROJECTS_PORT);
}
bootstrap();
