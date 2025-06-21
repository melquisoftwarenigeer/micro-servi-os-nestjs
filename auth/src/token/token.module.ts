import { Module } from '@nestjs/common';
import { InternalAuthService } from './internal-auth.service';

@Module({
  providers: [InternalAuthService],
  exports: [InternalAuthService], // 👈 necessário para outros módulos usarem
})
export class TokenModule {}
