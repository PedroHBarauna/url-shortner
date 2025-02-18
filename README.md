# UrlShortner 🚀

## Autor

- Pedro Barauna

## O que é necessário para rodar?

### Versão do NodeJS

> 22

### Gerenciador de Pacotes (npm, yarn)

**[npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)**

**[yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stablem)**

### Docker

**[Instalação](https://www.docker.com/products/docker-desktop/)**

## Explicação do projeto 📚

O **UrlShortner** é um encurtador de URLs que gera links curtos de 6 caracteres com redirecionamento para a URL de destino. O sistema conta com autenticação de usuários e foi desenvolvido utilizando o **NestJS**, em uma arquitetura de **monolito modular**. Para o gerenciamento de dados, foi utilizado o **PostgreSQL** e o **ORM Prisma**.
A autenticação é feita utilizando **JWT** e sessões enquanto e encriptação de login com **bcrypt**.

O Projeto tem duas tabelas relacionais simples, sendo uma de usuários e uma de URLs. Qualquer um pode criar uma url encurtada com um link de até 255 caracteres, porém a listagem, edição e delete dos mesmos não é possível. Qualquer um pode criar um usuário novo e autenticá-lo, e assim conseguir realizar as operações de URLs antes não permitidas.

Para ser redirecionado, basta colocar o localhost:3000/id_url_encurtada em outra aba e pronto!

**Certifique-se que a porta que rodará a aplicação não esteja em uso no momento.**

A documentação da API pode ser acessada em: **[localhost:3000/api](http://localhost:3000/api)** ao rodar o projeto localmente.

## Como rodar o projeto

### Adicionar variáveis de ambiente

1. Crie um arquivo .env e adicione as variáveis do .env.example no arquivo criado.

### Rodar com Docker 🐳

1. Execute o seguinte comando para subir os containers do Docker:

   ```bash
   docker-compose up
   ```

### Rodar no terminal ⚙️

1. Para rodar o banco no Docker, execute:

   ```bash
   docker-compose up postgres-shortner-url
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute o schame do Prisma:

   ```bash
   npx prisma generate
   ```

4. Execute as migrations:

   ```bash
   npm run migrate
   ```

5. Execute o projeto em produção

   ```bash
   npm run start:prod
   ```

A documentação da API pode ser acessada em: **[localhost:3000/api](http://localhost:3000/api)** ao rodar o projeto localmente.

## Pontos de Melhoria

Se fossemos escalar isso horizontalmente tem alguns pontos a serem levados em conta:

1. Balanceamento de carga: Garantir que a carga seja distribuida de maneira igual entre as instâncias do serviço

2. Banco de dados: Replicação dos dados e Caching para acelerar os processos e manter performance.

3. Sincronização de dados: Utilização de mensageria para a consistência.

## Próximos passos

### Monorepo

O NestJS tem suporte a monorepo nativo pelo CLI tornando possível migrarmos os módulos para um app dentro do monorepo criado.
Tornar Monorepo traria o benefício de reutilização dos mesmos módulos para outros apps que poderiam ser criados. (Por exemplo: o módulo de usuário e autenticação no app de gestão desses links para verificar acessos e entre outros)

### Adicionar Registros de Clicks dos Links

Atualmente ele apenas registra o click dos redirects, mas podemos a parte do header do request trazer informações relevantes do navegador e da sessão do usuário.
