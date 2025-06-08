// src/user/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string
}
