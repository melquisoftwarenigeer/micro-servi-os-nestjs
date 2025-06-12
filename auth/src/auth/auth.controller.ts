// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authservice: AuthService,
    private jwtService: JwtService
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

  @Post('verify')
  async verify(@Req() req: Request) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Token missing');

    const token = authHeader.replace('Bearer ', '');

    try {
      const payload = this.jwtService.verify(token); // segredo JWT deve ser o mesmo usado no sign()
      return { valid: true, userId: payload.sub };
    } catch {
      throw new UnauthorizedException('Invalid token');
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
