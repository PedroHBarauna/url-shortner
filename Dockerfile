# Build
FROM node:20 AS build

COPY ./prisma /app/prisma
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./tsconfig.build.json /app/tsconfig.build.json
COPY ./src/ /app/src/

WORKDIR /app

RUN npm install
RUN npm run build

# Runtime
FROM node:20 AS runtime

RUN apt-get update && apt-get install -y --no-install-recommends tzdata && \
    rm -rf /var/lib/apt/lists/*
ENV TZ 'America/Sao_Paulo'

COPY ./prisma /app/prisma
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./tsconfig.build.json /app/tsconfig.build.json
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

WORKDIR /app

CMD ["npm", "run", "start:prod"]
