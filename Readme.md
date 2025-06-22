# Micro Serviço NestJS - Auth

## Descrição

Este repositório contém uma arquitetura de micro serviços desenvolvida em NestJS, com foco no serviço de autenticação (`auth`) e serviços auxiliares (`projects` e `tasks`). A comunicação interna é protegida por tokens JWT gerados dinamicamente para segurança.

---

## Rodar localmente

Clone o repositório e inicie os serviços com Docker Compose:

```bash
git clone https://github.com/sua-org/micro-servico-nest-deploy.git
cd micro-servico-nest-deploy


📦 Serviços e Portas

| Serviço     | Porta externa | Porta interna |
| ----------- | ------------- | ------------- |
| auth        | `3001`        | `3000`        |
| projects    | `3002`        | `3000`        |
| task        | `3003`        | `3000`        |
| auth-db     | `5433`        | `5432`        |
| projects-db | `5434`        | `5432`        |
| task-db     | `5435`        | `5432`        |

Gerar chave token interna (INTERNAL_JWT_SECRET)

Para garantir a segurança na comunicação entre os micro serviços, é necessário gerar a chave secreta compartilhada para os tokens internos. Para isso:

Modo Dev
    Acesse o diretório auth:

Execute o script para gerar e propagar o token interno:
    cd auth
    npx ts-node src/token/script/set-internal-token.ts

Modo docker
    Acesse a Raiz do projeto:

Execute o script para gerar e propagar o token interno:
    npm run generate:secret

Este script atualiza o arquivo .env em todos os serviços (auth, projects-service e tasks-service) com a variável INTERNAL_JWT_SECRET.

Estrutura dos diretórios

├── docker-compose.yml
├── auth/
│   ├── Dockerfile
│   ├── src/
│   ├── package.json
├── projects-service/
│   ├── Dockerfile
│   ├── src/
│   ├── package.json
├── tasks-service/
│   ├── Dockerfile
│   ├── src/
│   ├── package.json

Build e deploy

Utilize o workflow do GitHub Actions para buildar e publicar as imagens Docker automaticamente em pushes para branches principais ou tags.

O workflow realiza as seguintes ações:

    Gera o token INTERNAL_JWT_SECRET

    Builda as imagens Docker para auth, projects-service e tasks-service

    Publica as imagens no Docker Hub com tags baseadas na versão

Variáveis de ambiente importantes
Variável	Descrição	Onde configurar
INTERNAL_JWT_SECRET	Chave secreta para validação dos tokens internos	No .env de cada serviço
DATABASE_URL	URL de conexão com o banco de dados	No .env de cada serviço
PORT	Porta que o serviço irá escutar	No .env (padrão é 3000)
Executar localmente com Docker Compose

O arquivo docker-compose.yml já está configurado para orquestrar todos os serviços e bancos de dados necessários para rodar a aplicação localmente.

Exemplo para subir tudo:

docker-compose up -d

Acesse cada serviço via localhost nas portas externas especificadas acima.
Contribuição

Contribuições são bem-vindas! Para contribuir:

    Faça um fork do repositório

    Crie uma branch com a sua feature ou correção (git checkout -b minha-feature)

    Faça commit das suas alterações (git commit -m "Minha feature")

    Envie para seu fork (git push origin minha-feature)

    Abra um Pull Request neste repositório

