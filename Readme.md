# Micro Serviços NestJS

## Visão geral

Este repositório contém uma arquitetura de micro serviços em NestJS com três aplicações independentes:

- `auth/` — serviço de autenticação e autorização
- `projects-service/` — serviço de projetos
- `task-service/` — serviço de tarefas

Cada serviço é uma aplicação NestJS separada e utiliza banco de dados Postgres.

O `docker-compose.yml` orquestra todos os serviços e seus bancos de dados.

## Por que NestJS?

NestJS é um framework Node.js que traz organização por módulos, controllers e providers usando decorators. Ele facilita o desenvolvimento de APIs escaláveis e mantém o fluxo parecido com arquiteturas mais tradicionais, mas em JavaScript/TypeScript.

Aqui estão alguns conceitos que aparecem neste projeto:

- `@Module()` — agrupa controllers e providers
- `@Controller()` — define rotas HTTP
- `@Injectable()` — define serviços injetáveis
- `@nestjs/jwt` / JWT — usado para autenticação e comunicação interna entre serviços
- `Prisma` / `TypeORM` — ORM para acesso ao banco

## Como rodar o projeto (passo a passo)

### 1) Pré-requisitos

- Node.js 20+ instalado
- Docker e Docker Compose instalados
- Git para clonar o repositório

### 2) Clonar o repositório

```bash
git clone https://github.com/melquisoftwarenigeer/micro-servi-os-nestjs.git
cd micro-servi-os-nestjs
```

### 3) Instalar dependências na raiz

```bash
npm install
```

### 4) Configurar variáveis de ambiente

Copie o exemplo para um arquivo real de ambiente:

Windows:
```powershell
copy .env.example .env
```

Linux / macOS:
```bash
cp .env.example .env
```

Depois, preencha os valores necessários dentro de `.env`.

#### Exemplo mínimo de `.env`

```env
AUTH_DB_USER=postgres
AUTH_DB_PASSWORD=123456
AUTH_DB_NAME=auth_db
AUTH_DB_PORT=5433
PROJECTS_DB_USER=postgres
PROJECTS_DB_PASSWORD=123456
PROJECTS_DB_NAME=projects_db
PROJECTS_DB_PORT=5434
TASKS_DB_USER=postgres
TASKS_DB_PASSWORD=123456
TASKS_DB_NAME=tasks_db
TASKS_DB_PORT=5435
AUTH_DATABASE_URL=postgresql://postgres:123456@auth-db:5432/auth_db
PROJECTS_DATABASE_URL=postgresql://postgres:123456@projects-db:5432/projects_db
TASKS_DATABASE_URL=postgresql://postgres:123456@tasks-db:5432/tasks_db
```

> Observação: o arquivo `.env` na raiz é usado pelo Docker Compose para substituir variáveis no `docker-compose.yml`.

### 5) Gerar o segredo interno compartilhado

O projeto usa um token JWT interno (`INTERNAL_JWT_SECRET`) para autorizar a comunicação entre os micro serviços.

```bash
npm run generate:secret
```

Esse comando gera o arquivo `.env.shared` na raiz com o segredo interno.

### 6) Subir os serviços com Docker Compose

```bash
docker compose up -d
```

Se o seu Docker ainda usar o comando clássico, também funciona:

```bash
docker-compose up -d
```

### 7) Verificar se os serviços subiram

```bash
docker compose ps
```

### 8) Endpoints disponíveis

- Auth: `http://localhost:3001`
- Projects: `http://localhost:3002`
- Tasks: `http://localhost:3003`

## Rodar em modo de desenvolvimento sem Docker

Se você quiser rodar a partir do código fonte local:

1. Entre na pasta do serviço que deseja executar.

```bash
cd auth
npm install
npm run start:dev
```

Para `projects-service` e `task-service`, o fluxo é o mesmo:

```bash
cd projects-service
npm install
npm run start:dev
```

```bash
cd task-service
npm install
npm run start:dev
```

2. Garanta que o arquivo `.env.shared` exista na raiz ou que a variável `INTERNAL_JWT_SECRET` esteja disponível no ambiente.
3. Ajuste também `DATABASE_URL` e demais variáveis de ambiente necessárias antes de iniciar o serviço.

## Estrutura de diretórios

```
.
├── auth/
├── projects-service/
├── task-service/
├── docker-compose.yml
├── .env.example
├── generate-shared-secret.ts
```

## Observações importantes

- `auth`, `projects-service` e `task-service` são aplicações NestJS separadas.
- `docker-compose.yml` usa imagens Docker pré-construídas para os serviços.
- O segredo interno é criado apenas uma vez e precisa estar disponível para todos os serviços.

## Próximo passo

Se quiser, posso agora ajudar a testar o `docker compose up -d` e ver se o sistema sobe corretamente, ou então explicar como cada serviço NestJS está organizado por módulos e controllers passo a passo.
