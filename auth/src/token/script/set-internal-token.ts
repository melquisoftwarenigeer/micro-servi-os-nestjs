import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

const services = ['auth', 'projects-service', 'task-service'];
const envFileName = '.env';
const tokenKey = 'INTERNAL_JWT_SECRET';

function generateToken(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

function updateEnvFile(servicePath: string, token: string) {
  const envPath = path.join(servicePath, envFileName);
  let envContent = '';

  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');
    const regex = new RegExp(`^${tokenKey}=.*$`, 'm');
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `${tokenKey}=${token}`);
    } else {
      envContent += `\n${tokenKey}=${token}`;
    }
  } else {
    envContent = `${tokenKey}=${token}`;
  }

  fs.writeFileSync(envPath, envContent, 'utf-8');
  console.log(`✔️ Atualizado: ${envPath}`);
}

function main() {
  const internalToken = generateToken();
  console.log(`🔐 Gerado INTERNAL_JWT_SECRET: ${internalToken}\n`);

  // Sobe 3 níveis: de `auth/src/token/script` → `../..../`
  const rootPath = path.resolve(__dirname, '../../../../');

  services.forEach(service => {
    const servicePath = path.join(rootPath, service);
    updateEnvFile(servicePath, internalToken);
  });
}

main();
