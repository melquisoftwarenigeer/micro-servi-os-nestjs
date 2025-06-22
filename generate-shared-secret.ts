// generate-shared-secret.ts
import * as fs from 'fs';
import * as crypto from 'crypto';

const secret = crypto.randomBytes(64).toString('hex');
const content = `INTERNAL_JWT_SECRET=${secret}`;

fs.writeFileSync('.env.shared', content, 'utf-8');
console.log('✅ Arquivo ".env.shared" criado com segredo JWT interno compartilhado.');
console.log(`🔐 INTERNAL_JWT_SECRET=${secret}`);
