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
ARG STRAPI_TOKEN=f17858a85c440c03e407798e82602f65774b277f392e801af0918dc761c857e51bb9a0a9df76859b59f78cd9df3c8d22c6df7dca37cef2ac594de984e6375a346c9249fd496d19bd7c76d69d29f0d74b9bb72196b82151223c6ce58afc33dbc4221365e3b8547e4ba655f469279108e00dd7bfa7697c9c6b81a369519a5e076f
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
