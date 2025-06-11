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


### ✅ Opção 2 — Embutir o `docker-compose.yml` no próprio repositório do app

Se quiser manter tudo num repositório só, você pode incluir um:

- `docker-compose.prod.yml`  
- `README.md` explicando que o app usa a imagem publicada

---

### ✅ Opção 3 — Criar um pacote Helm ou Stack file (para K8s / Swarm)

Se você está indo para produção com orquestradores, o ideal é oferecer:

- Chart Helm (para Kubernetes)
- Stack file YAML (para Docker Swarm)

Mas para a maioria dos devs e testes locais, **a melhor prática é a opção 1**:  
👉 Repositório separado de deploy contendo apenas `docker-compose.yml` + documentação.

---

### 🎁 Bônus — você pode versionar isso

Inclua no `docker-compose.yml` algo como:

```yaml
auth:
  image: melquidocker/micro-servico-nest:auth-v1.1.1