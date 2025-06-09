FROM node:22-alpine

RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  pkgconfig \
  pixman-dev \
  cairo-dev \
  pango-dev \
  giflib-dev \
  jpeg-dev \
  libpng-dev \
  && ln -sf python3 /usr/bin/python

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install --frozen-lockfile

COPY . .

CMD ["pnpm", "dev"]
