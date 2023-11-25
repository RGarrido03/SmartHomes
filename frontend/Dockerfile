FROM oven/bun:1

WORKDIR /frontend

COPY package.json ./
COPY bun.lockb ./

RUN bun install

EXPOSE 3000
CMD ["bun", "dev"]