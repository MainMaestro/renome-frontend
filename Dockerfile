# Используем стабильную версию Node
FROM node:20-slim as builder

WORKDIR /app

# Копируем зависимости
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Финальный легковесный образ
FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/.output ./.output

# Nuxt 3 по умолчанию слушает 3000 порт
ENV PORT=3001
EXPOSE 3001

CMD ["node", ".output/server/index.mjs"]
