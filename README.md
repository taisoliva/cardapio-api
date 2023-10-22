# SOBRE 

Esta é uma aplicação em que você cria produtos, categoria e cardápios. De acordo com o horário você obtém um cardápio específico. 

# Como rodar essa aplicação

1. Clone este repositório pelo seguinte <a href="https://github.com/taisoliva/cardapio-api.git"> link </a>
2.  Instale todas as dependências 
```bash
    npm i
```
4. Crie um arquivo .env na raiz do seu projeto
5. Configure o arquivo .env de acordo com o .env.example
``` MONGODB_USERNAME=tais15oliva
    MONGODB_PASSWORD=CBGG2DvKeKcv4FMO
    MONGODB_NAME=cardapio
    DATABASE_URL=mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.tawzcp8.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority
```
5. Rode a API com o comando
```npm run start:dev```

# Como rodar os testes da Aplicação

1. Clone este repositório pelo seguinte <a href="https://github.com/taisoliva/cardapio-api.git"> link </a>
2.  Instale todas as dependências 
```npm i ```
3. Crie um arquivo .env.test na raiz do projeto
4. Configure o arquivo .env.test de acordo com o .env.example
```MONGODB_USERNAME=tais15oliva
MONGODB_PASSWORD=CBGG2DvKeKcv4FMO
MONGODB_NAME=cardapio-test


DATABASE_URL=mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.tawzcp8.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority

```
5. Rode os testes unitários
```npm run test```
6. Rode a cobertura de testes unitários
```npm run test:cov```
7. Rode os testes de integração (e2e)
```npm run test:e2e```
