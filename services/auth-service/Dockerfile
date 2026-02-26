FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

# Muda a porta conforme o serviço:
# auth-service    → 3001
# user-service    → 3002
# product-service → 3003
# order-service   → 3004
# payment-service → 3005
EXPOSE 3001

CMD ["node", "dist/server.js"]