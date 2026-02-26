# 🛒 Store API — Microservices

API REST de uma loja virtual construída com arquitetura de microserviços, utilizando Node.js, TypeScript, Express, PostgreSQL, Nginx e Docker.

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Serviços](#serviços)
- [Fluxo de Autenticação](#fluxo-de-autenticação)
- [Fluxo de Pedidos](#fluxo-de-pedidos)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Como Rodar](#como-rodar)
- [Rotas da API](#rotas-da-api)

---

## Visão Geral

Este projeto é uma API de e-commerce construída com foco em **microserviços independentes**, onde cada domínio da aplicação é isolado em seu próprio serviço com responsabilidade única.

O **Nginx** atua como proxy reverso e único ponto de entrada da aplicação, roteando as requisições para os serviços corretos. Os serviços se comunicam entre si via **HTTP interno** dentro da rede Docker.

---

## Arquitetura

```
Internet
   ↓
Nginx :80  (único ponto de entrada)
   ↓
┌─────────────────────────────────────────────┐
│              Rede interna Docker            │
│                                             │
│  auth-service     :3001                     │
│  user-service     :3002                     │
│  product-service  :3003                     │
│  order-service    :3004                     │
│  payment-service  :3005                     │
│  postgres         :5432                     │
└─────────────────────────────────────────────┘
```

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| Node.js + TypeScript | Runtime e linguagem de cada serviço |
| Express | Framework HTTP dos serviços |
| PostgreSQL | Banco de dados relacional |
| Nginx | Proxy reverso / API Gateway |
| Docker + Docker Compose | Orquestração dos containers |
| JWT | Autenticação stateless entre serviços |
| pnpm | Gerenciador de pacotes |

---

## Serviços

### 🔐 auth-service (porta 3001)
Responsável pelo registro e login de usuários. Gera e valida tokens JWT. Se comunica com o `user-service` via HTTP interno para buscar e criar usuários.

### 👤 user-service (porta 3002)
Gerencia os dados dos usuários. Expõe endpoints internos consumidos pelo `auth-service` e endpoints externos para gerenciamento de perfil.

### 📦 product-service (porta 3003)
Gerencia o catálogo de produtos da loja. Controla estoque, categorias e listagens.

### 🛍️ order-service (porta 3004)
Gerencia a criação e o ciclo de vida dos pedidos. Se comunica com `product-service` para verificar estoque e com `payment-service` para processar o pagamento.

### 💳 payment-service (porta 3005)
Responsável pelo processamento de pagamentos. Recebe solicitações do `order-service` e atualiza o status do pedido.

---

## Fluxo de Autenticação

### Register
```
Cliente → POST /api/auth/register
              ↓
        auth-service recebe (name, email, password)
              ↓
        chama user-service → GET /users/findByEmail
              ↓
        se não existir → POST /users (cria usuário)
              ↓
        gera JWT e retorna ao cliente
```

### Login
```
Cliente → POST /api/auth/login
              ↓
        auth-service recebe (email, password)
              ↓
        chama user-service → GET /users/findByEmail
              ↓
        verifica senha com bcrypt
              ↓
        gera JWT e retorna ao cliente
```

### Rotas protegidas
Todas as rotas fora de `/api/auth` exigem o header:
```
Authorization: Bearer <token>
```
O middleware `authGuard` valida o token antes de chegar no controller.

---

## Fluxo de Pedidos

```
Cliente → POST /api/orders
              ↓
        order-service cria o pedido
              ↓
        chama product-service → verifica estoque
              ↓
        chama payment-service → processa pagamento
              ↓
        payment-service retorna status
              ↓
        order-service atualiza o pedido e retorna ao cliente
```

---

## Estrutura de Pastas

```
store-api/
├── docker-compose.yml
├── .env
├── .gitignore
├── README.md
├── LICENSE
│
├── nginx/
│   ├── Dockerfile
│   └── nginx.conf
│
└── services/
    ├── auth-service/
    │   ├── Dockerfile
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/
    │       ├── server.ts
    │       ├── routes/
    │       ├── controllers/
    │       ├── models/
    │       ├── middlewares/
    │       ├── config/
    │       └── utils/
    │
    ├── user-service/
    ├── product-service/
    ├── order-service/
    └── payment-service/
        (mesma estrutura interna do auth-service)
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_USER=admin
DB_PASS=senha123
DB_NAME=store
DB_HOST=postgres
DB_PORT=5432

JWT_SECRET=sua_chave_secreta_aqui
```

> ⚠️ Nunca suba o `.env` para o GitHub. Ele já está no `.gitignore`.

---

## Como Rodar

### Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando

### Subir todos os serviços

```bash
docker-compose up --build
```

### Rodar em background

```bash
docker-compose up --build -d
```

### Parar tudo

```bash
docker-compose down
```

### Parar e limpar o banco de dados

```bash
docker-compose down -v
```

### Ver logs de um serviço específico

```bash
docker-compose logs -f auth-service
```

---

## Rotas da API

Todas as rotas são acessadas via `http://localhost`.

### Auth
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Cadastro de usuário | ❌ |
| POST | `/api/auth/login` | Login e geração de JWT | ❌ |

### Users
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/api/users/me` | Dados do usuário logado | ✅ |
| PUT | `/api/users/me` | Atualizar perfil | ✅ |

### Products
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/api/products` | Listar produtos | ❌ |
| GET | `/api/products/:id` | Buscar produto | ❌ |
| POST | `/api/products` | Criar produto | ✅ |
| PUT | `/api/products/:id` | Atualizar produto | ✅ |
| DELETE | `/api/products/:id` | Deletar produto | ✅ |

### Orders
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/api/orders` | Listar pedidos do usuário | ✅ |
| GET | `/api/orders/:id` | Buscar pedido | ✅ |
| POST | `/api/orders` | Criar pedido | ✅ |

### Payments
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/api/payments` | Processar pagamento | ✅ |
| GET | `/api/payments/:orderId` | Status do pagamento | ✅ |

---

## Autor : Pedro Peixoto

Feito para fins de estudo e evolução em arquitetura de microserviços com Node.js.