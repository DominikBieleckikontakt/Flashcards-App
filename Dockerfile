# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 py3-pip make g++

RUN npm install -g pnpm@latest-10

COPY package.json pnpm-lock.yaml* ./

RUN pnpm fetch --prod && pnpm install -r --offline --prod

# Stage 2: Development
FROM node:20-alpine AS development

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev", "--turbopack"]