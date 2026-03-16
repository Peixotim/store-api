# 🛒 Store API — Microservices Architecture

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

Uma robusta infraestrutura de e-commerce baseada em **Microserviços**, projetada para ser escalável, resiliente e orientada a eventos. Este projeto demonstra a implementação de padrões modernos de arquitetura distribuída, utilizando comunicação síncrona (HTTP/REST) e assíncrona (RabbitMQ).

---

## 🏗️ Arquitetura do Sistema

O projeto é composto por 5 microserviços independentes, cada um com sua própria responsabilidade e isolamento de dados.

### Fluxo de Comunicação
- **Síncrona (REST):** Utilizada para operações imediatas, como autenticação e consulta de perfil.
- **Assíncrona (Event-Driven):** Utilizada para o fluxo de pedidos e pagamentos via **RabbitMQ**, garantindo que o sistema seja resiliente a falhas temporárias em serviços específicos.
- **API Gateway (Nginx):** Atua como o único ponto de entrada para o mundo exterior, roteando o tráfego e protegendo os serviços internos.

```mermaid
graph TD
    Client[Cliente / Frontend] -->|HTTP| Nginx{Nginx API Gateway}
    
    subgraph "Internal Network"
        Nginx -->|/api/auth| Auth[Auth Service]
        Nginx -->|/api/users| User[User Service]
        Nginx -->|/api/products| Product[Product Service]
        Nginx -->|/api/orders| Order[Order Service]
        Nginx -->|/api/payments| Payment[Payment Service]
        
        Auth <-->|Internal HTTP| User
        Order -->|Internal HTTP| Product
        
        Order -->|Publish order_created| RabbitMQ((RabbitMQ))
        RabbitMQ -->|Consume order_created| Payment
        Payment -->|Publish payment_finished| RabbitMQ
        RabbitMQ -->|Consume payment_finished| Order
        
        Auth & User & Product & Order & Payment --- DB[(PostgreSQL)]
    end
```

---

## 🚀 Microserviços e Responsabilidades

### 🔐 Auth Service
Responsável pelo ciclo de vida de autenticação. Realiza o registro de novos usuários (comunicando-se com o `user-service`) e gera tokens **JWT** para sessões seguras.

### 👤 User Service
Gerencia o domínio de usuários e perfis. Fornece dados essenciais para o serviço de autenticação e permite que os usuários gerenciem suas informações pessoais.

### 📦 Product Service
O catálogo central da aplicação. Gerencia o inventário, preços e detalhes dos produtos disponíveis para venda.

### 🛍️ Order Service
Orquestrador do processo de compra. Cria pedidos, valida estoque via HTTP e inicia o fluxo de pagamento postando eventos na fila do RabbitMQ.

### 💳 Payment Service
Processador de pagamentos (Simulação). Escuta novos pedidos, processa a transação e notifica o `order-service` sobre o sucesso ou falha do pagamento de forma assíncrona.

---

## 🛠️ Tecnologias Utilizadas

- **Runtime:** Node.js v18+
- **Linguagem:** TypeScript
- **Framework:** Express.js
- **Banco de Dados:** PostgreSQL (Sequelize ORM)
- **Mensageria:** RabbitMQ (amqplib)
- **Proxy/Gateway:** Nginx
- **Containerização:** Docker & Docker Compose
- **Package Manager:** pnpm (Monorepo/Workspaces)

---

## ⚙️ Como Executar

### Pré-requisitos
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Peixotim/store-api.git
   cd store-api
   ```

2. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz seguindo o modelo:
   ```env
   DB_USER=admin
   DB_PASSWORD=admin
   DB_NAME=store
   DB_HOST=postgres
   DB_PORT=5432
   JWT_SECRET=super_secret_key_123
   AMQP_URL=amqp://guest:guest@rabbitmq:5672
   ```

3. **Inicie a infraestrutura:**
   ```bash
   docker-compose up --build
   ```

A API estará disponível em `http://localhost`.

---

## 🛣️ Principais Endpoints

| Serviço | Endpoint | Método | Descrição |
|---|---|---|---|
| **Auth** | `/api/auth/login` | POST | Autenticação e retorno de Token JWT |
| **User** | `/api/users/me` | GET | Perfil do usuário logado |
| **Product** | `/api/products` | GET | Listagem de produtos |
| **Order** | `/api/orders` | POST | Criação de um novo pedido |
| **Payment** | `/api/payments` | POST | Consulta manual de transações |

---

## 👨‍💻 Autor

**Pedro Peixoto**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Peixotim)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/Peixotim)

---
*Este projeto foi desenvolvido com fins educacionais para explorar os desafios e soluções de sistemas distribuídos.*
