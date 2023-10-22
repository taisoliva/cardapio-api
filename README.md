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
  <summary>/menu</summary>

  Você pode usar os seguintes métodos HTTP para interagir com este projeto:

  - **GET: /menu** Use o método GET para recuperar informações de menus. Exemplo de retorno
    ```
     [
      {
        "id": "6532f95f1ffffd75e088d384",
        "name": "Bolos e Tortas!",
        "type": "noturno",
        "products": [
            {
                "id": "65332fae38310a4e610a1f38",
                "name": "Bolo de Cenoura!!",
                "price": 1200,
                "image": "https://assets.unileversolutions.com/recipes-v2/67405.jpg",
                "description": "Bolo feito com cenouras recém colhidas e uma deliciosa cobertura de chocolate",
                "menuId": "6532f95f1ffffd75e088d384",
                "categoryId": "6532f9601ffffd75e088d385"
            }
        ]
      }
    ]
    ```
  - **GET: /menu/menuID** Use o método GET para recuperar informações de um menu específico.
 
  
  - **POST: /menu** Use o método POST para criar novos recursos no projeto. Necessário passar o seguinte body
    ```
    body = {
      name: "Nome do seu Menu",
      type: "diurno" | "noturno"
    }
    ```
 
  - **PATCH: /menu/menuId** Use o método PATCH para atualizar parcialmente algum menu. Necessário passar no body o que se deseja atualizar:
    ```
    body = {
      name: "Nome do seu novo Menu",
    }
    ```
 
  - **DELETE: /menu/menuId** Use o método DELETE para excluir um menu específico

</details>
