// src/user/user.service.ts
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async create(email: string, password: string, name: string) {
        try {
            const hash = await bcrypt.hash(password, 10);
            const savedUser = await this.prisma.user.create({
                data: {
                    email,
                    password: hash,
                    name,
                },
            });

            if (!savedUser || !savedUser.id) {
                throw new HttpException('Falha ao salvar usuário!', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return savedUser;

        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === 'P2002' &&
                (error.meta?.target as string[]).includes('email')
            ) {
                throw new HttpException(
                    {
                        status: HttpStatus.CONFLICT,
                        error: 'Email já cadastrado',
                        message: 'Já existe um usuário com esse e-mail. Tente recuperar sua senha ou usar outro e-mail.',
                    },
                    HttpStatus.CONFLICT,
                );
            }

            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Erro ao criar usuário',
                    message: error?.message || 'Erro desconhecido',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async update(id: string, data: Prisma.UserUpdateInput) {
        if (data.password && typeof data.password === 'string') {
            data.password = await bcrypt.hash(data.password, 10);
        }

        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    findAll() {
        return this.prisma.user.findMany();
    }

    findOne(id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    delete(id: string) {
        return this.prisma.user.delete({ where: { id } });
    }
}
