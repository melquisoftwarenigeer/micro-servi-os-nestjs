import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const isDocker = fs.existsSync('/.dockerenv');
  const PROJECTS_PORT = isDocker ? (process.env.PROJECTS_PORT || 3000) : 3002;
  const app = await NestFactory.create(AppModule);
  await app.listen(PROJECTS_PORT);
}
bootstrap();
