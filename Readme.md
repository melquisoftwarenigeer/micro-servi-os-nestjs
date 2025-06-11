# Micro Serviço NestJS - Auth

## Rodar localmente

```bash
git clone https://github.com/sua-org/micro-servico-nest-deploy.git
cd micro-servico-nest-deploy
docker-compose up -d

📦 Serviços e Portas

| Serviço     | Porta externa | Porta interna |
| ----------- | ------------- | ------------- |
| auth        | `3001`        | `3000`        |
| projects    | `3002`        | `3000`        |
| auth-db     | `5433`        | `5432`        |
| projects-db | `5434`        | `5432`        |
