# Используем стабильную версию Node
FROM node:20-slim as builder

WORKDIR /app

# Копируем зависимости
COPY package*.json ./
RUN npm install

# Копируем проект и собираем его
COPY . .
# Прокидываем переменную с URL бекенда для сборки
ARG STRAPI_URL=http://79.174.80.177:1337
ARG STRAPI_TOKEN
ENV STRAPI_URL=$STRAPI_URL
ENV STRAPI_TOKEN=$STRAPI_TOKEN

RUN npm run build

# Финальный легковесный образ
FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/.output ./.output

# Nuxt 3 по умолчанию слушает 3000 порт
ENV PORT=3001
EXPOSE 3001

CMD ["node", ".output/server/index.mjs"]
