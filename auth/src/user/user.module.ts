import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module'; // ajuste o caminho se necessário
@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }
