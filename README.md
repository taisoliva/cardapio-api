# Cardapio-API 

## SOBRE 

Esta é uma aplicação em que você cria produtos, categoria e cardápios. De acordo com o horário você obtém um cardápio específico. 

- Banco de Dados: MongoDB
- Modelagem de dados
- PrismaORM
- Orientação a Objeto com NestJs
- Typescript
- Testes automatizados de integração com Jest
- Testes unitários

## Tecnologias

<p>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
</p>
O prisma foi utilizado para a criação do banco de dados e também para monitorar as migrações e as alterações realizadas. O Jest foi utilizado juntamente com a biblioteca <a href="https://fakerjs.dev/api/"> faker </a> para realizar os testes. 

## Como rodar essa aplicação

1. Clone este repositório pelo seguinte <a href="https://github.com/taisoliva/cardapio-api.git"> link </a>
2.  Instale todas as dependências 
```
 npm i
```
3. Crie um arquivo .env na raiz do seu projeto
4. Configure o arquivo .env de acordo com o .env.example
```
MONGODB_USERNAME=seu-user
MONGODB_PASSWORD=sua-senha
MONGODB_NAME=nome-do-banco
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

## Como rodar os testes da Aplicação

1. Clone este repositório pelo seguinte <a href="https://github.com/taisoliva/cardapio-api.git"> link </a>
2.  Instale todas as dependências 
```npm i ```
3. Crie um arquivo .env.test na raiz do projeto
4. Configure o arquivo .env.test de acordo com o .env.example
```
MONGODB_USERNAME=seu-user
MONGODB_PASSWORD=sua-senha
MONGODB_NAME=nome-do-banco
DATABASE_URL=mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.tawzcp8.mongodb.net/${MONGODB_NAME}?retryWrites=true&w=majority

```
5. Inicialize o banco de dados para os testes com o Prisma
```
npm run test:prisma
```
6. Rode os testes unitários
```
npm run test
```
7. Rode a cobertura de testes unitários
```
npm run test:cov
```
8. Rode os testes de integração (e2e)
```
npm run test:e2e
```

## Rotas da aplicação

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
      name: "Nome do Menu Atualizado",
    }
    ```
 
  - **DELETE: /menu/menuId** Use o método DELETE para excluir um menu específico

</details>

<details>
  <summary>/category</summary>

  Você pode usar os seguintes métodos HTTP para interagir com este projeto:

  - **GET: /category** Use o método GET para recuperar informações das categorias. Exemplo de retorno
    ```
     [
       {
        "id": "6532f9601ffffd75e088d385",
        "name": "Doce",
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
  - **GET: /category/categoryID** Use o método GET para recuperar informações de uma categoria específica.
 
  
  - **POST: /category** Use o método POST para criar novos recursos no projeto. Necessário passar o seguinte body
    ```
    body = {
      name: "Nome da Categoria",
    }
    ```
 
  - **PATCH: /category/categoryID** Use o método PATCH para atualizar parcialmente alguma categoria. Necessário passar no body o que se deseja atualizar:
    ```
    body = {
      name: "Nome da Categoria Atualizada",
    }
    ```
 
  - **DELETE: /category/categoryID** Use o método DELETE para excluir uma categoria específica

</details>

<details>
  <summary>/products</summary>

  Você pode usar os seguintes métodos HTTP para interagir com este projeto:

  - **GET: /products** Use o método GET para recuperar informações dos produtos. Exemplo de retorno
    ```
     [
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
    ```
  - **GET: /products/productID** Use o método GET para recuperar informações de um produto específico.
 
  
  - **POST: /products** Use o método POST para criar novos recursos no projeto. Necessário passar o seguinte body
    ```
    body = {
      name: "Nome do Produto",
      price: 1120,
      imagem: URL da Imagem,
      description: descrição breve do produto,
      menuId: menu_id,
      categoryId: category_id 
    }
    ```
 
  - **PATCH: /products/productID** Use o método PATCH para atualizar parcialmente algum produto. Necessário passar no body o que se deseja atualizar:
    ```
    body = {
      name: "Nome da Produto Atualizado",
    }
    ```
 
  - **DELETE: /products/productID** Use o método DELETE para excluir um produto específico.

</details>
