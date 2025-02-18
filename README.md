# UrlShortner 🚀

## Contribuidores

- Pedro Barauna

## Versão do NodeJS

> 22

## Explicação do projeto 📚

O **UrlShortner** é um encurtador de URLs que gera links curtos de 6 caracteres com redirecionamento para a URL de destino. O sistema conta com autenticação de usuários e foi desenvolvido utilizando o **NestJS**, em uma arquitetura de **monolito modular**. Para o gerenciamento de dados, foi utilizado o **PostgreSQL** e o **ORM Prisma**.

A documentação da API pode ser acessada em:  
**[localhost:3000/api](http://localhost:3000/api)** ao rodar o projeto localmente.

## Como rodar o projeto

### Rodar com Docker 🐳

1. Execute o seguinte comando para subir os containers do Docker:

   ```bash
   docker-compose up
   ```

2. Para rodar as migrations e seeds no terminal com Prisma:

```bash
npx prisma migrate deploy
npx prisma seed
```

### Rodar no terminal ⚙️

1. Para rodar o banco no Docker, execute:

   ```bash
   docker-compose up
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute as migrations:

   ```bash
   npm run migrate
   ```

4. Execute as seeds:

   ```bash
   npm run seed
   ```

5. Execute o projeto em produção

```bash
npm run start:prod
```

## Pontos de Melhoria

Se fossemos escalar isso horizontalmente tem alguns pontos a serem levados em conta:

1. Balanceamento de carga: Garantir que a carga seja distribuida de maneira igual entre as instâncias do serviço

2. Banco de dados: Replicação dos dados e Caching para acelerar os processos e manter performance.

3. Sincronização de dados: Utilização de mensageria para a consistência.
