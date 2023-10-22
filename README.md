# SOBRE 

Esta é uma aplicação em que você cria produtos, categoria e cardápios. De acordo com o horário você obtém um cardápio específico. 

- Banco de Dados: MongoDB
- Modelagem de dados
- PrismaORM
- Orientação a Objeto com NestJs
- Typescript
- Testes automatizados de integração com Jest
- Testes unitários 

# Como rodar essa aplicação

1. Clone este repositório pelo seguinte <a href="https://github.com/taisoliva/cardapio-api.git"> link </a>
2.  Instale todas as dependências 
```
 npm i
```
4. Crie um arquivo .env na raiz do seu projeto
5. Configure o arquivo .env de acordo com o .env.example
```
MONGODB_USERNAME=tais15oliva
MONGODB_PASSWORD=CBGG2DvKeKcv4FMO
MONGODB_NAME=cardapio
      DATABASE_URL=mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.tawzcp8.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority
```
5. Inicialize o banco de dados com o Prisma
```
npx prisma generate
```
6. Rode a API com o comando
```
npm run start:dev
```

# Como rodar os testes da Aplicação

1. Clone este repositório pelo seguinte <a href="https://github.com/taisoliva/cardapio-api.git"> link </a>
2.  Instale todas as dependências 
```npm i ```
3. Crie um arquivo .env.test na raiz do projeto
4. Configure o arquivo .env.test de acordo com o .env.example
```
MONGODB_USERNAME=tais15oliva
MONGODB_PASSWORD=CBGG2DvKeKcv4FMO
MONGODB_NAME=cardapio-test


DATABASE_URL=mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.tawzcp8.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority

```
5. Inicialize o banco de dados para os testes com o Prisma
   ```
   npm run test:prisma
   ```
6. Rode os testes unitários
```npm run test```
7. Rode a cobertura de testes unitários
```npm run test:cov```
8. Rode os testes de integração (e2e)
```npm run test:e2e```

# Rotas da aplicação

<details>
  <summary>:zap: Most Used Languages</summary>
  <img height="172em" alt="Tais's GitHub Top Languages" src="https://github-readme-stats.vercel.app/api/top-langs/?username=taisoliva&layout=compact&langs_count=10&theme=rose_pine&bg_color"/>
</details>

