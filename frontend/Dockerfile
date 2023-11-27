FROM node:21

WORKDIR /frontend

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

EXPOSE 3000
CMD ["pnpm", "dev"]