// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authservice: AuthService
  ) { }

  @Post('register')
  async register(@Body() creatuserdto: CreateUserDto) {
    const user = await this.userService.create(creatuserdto.email, creatuserdto.password, creatuserdto.name);

    return {
      status: 200,
      message: 'Usuário Cadastrado',
      data: user
    }

  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authservice.login(loginDto.email, loginDto.password);
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }


  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
