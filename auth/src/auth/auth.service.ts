import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Prisma } from 'generated/prisma';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private prisma: PrismaService
    ) { }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Senha não conecidem');
        }

        const payload = { email: user.email, sub: user.id };
        return {
            messagem: 'Login sucesso!',
            status: 200,
            access_token: this.jwtService.sign(payload)
        }
    }

}
