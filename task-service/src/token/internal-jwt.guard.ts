import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class InternalJwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers['authorization'];

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token ausente');
    }

    const token = authHeader.split(' ')[1];

    try {
      const secret = process.env.INTERNAL_JWT_SECRET;
      if (!secret) {
        throw new Error('Missing INTERNAL_JWT_SECRET');
      }
      // const decoded = jwt.verify(token, secret);
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
      if (decoded.iss !== 'gateway') {
        throw new UnauthorizedException('Token inválido: origem incorreta');
      }
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
