import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InternalAuthService {
  generateInternalToken(): string {
    return jwt.sign(
      { service: 'gateway' }, // Payload
      process.env.INTERNAL_JWT_SECRET!, // Chave secreta
      {
        expiresIn: '5m',
        issuer: 'gateway', // Identifica que o token veio do Gateway
      },
    );
  }
}
