import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class CreateUserDto {
    
    @IsString()
    @MinLength(10, { message: 'Digite nome válido' })
    name: string; 
    
    @IsEmail({}, { message: 'E-mail inválido.' })
    @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
    email: string;
  
    @IsString()
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
    password: string;
  
  }
  