#!/bin/sh

echo "Aguardando o banco de dados ficar disponível..."

# Aguarda o banco de dados responder na porta 5432
until nc -z auth-db 5432; do
  sleep 1
done

echo "Banco disponível. Executando migrations..."

npx prisma generate
npx prisma migrate deploy

echo "Iniciando a aplicação..."
npm run build
exec node dist/main
