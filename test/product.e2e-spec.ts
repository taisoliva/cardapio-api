import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { E2EUtils } from './utils/e2e-utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { faker } from '@faker-js/faker';
import { CategoryFactory } from './factories/category.factory';
import { MenuFactory } from './factories/menu.factory';
import { ProductFactory } from './factories/product.factory';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = app.get(PrismaService);

    await E2EUtils.cleanDB(prisma);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST products => should return BAD REQUEST if body is empty', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .send({});
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toContain('name should not be empty');
  });

  it('/POST products => should return BAD REQUEST if menuId is not 24 characters', async () => {
    const category = await CategoryFactory.build(prisma);

    const body = {
      name: faker.commerce.product(),
      price: faker.number.int(),
      image: faker.image.url(),
      description: faker.commerce.productDescription(),
      menuId: '123',
      categoryId: category.id,
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(body);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toContain(
      'menuId must be longer than or equal to 24 characters',
    );
  });

  it('/POST products => should return BAD REQUEST if categoryId is not 24 characters', async () => {
    const menu = await MenuFactory.build(prisma, 'diurno');

    const body = {
      name: faker.commerce.product(),
      price: faker.number.int(),
      image: faker.image.url(),
      description: faker.commerce.productDescription(),
      menuId: menu.id,
      categoryId: '123',
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(body);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toContain(
      'categoryId must be longer than or equal to 24 characters',
    );
  });

  it('/POST products => should return NOT FOUND if menuId does not exists', async () => {
    const category = await CategoryFactory.build(prisma);

    const body = {
      name: faker.commerce.product(),
      price: faker.number.int(),
      image: faker.image.url(),
      description: faker.commerce.productDescription(),
      menuId: faker.database.mongodbObjectId(),
      categoryId: category.id,
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(body);
    expect(response.body.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.message).toContain(`Menu ${body.menuId} not found`);
  });

  it('/POST products => should return NOT FOUND if menuId does not exists', async () => {
    const menu = await MenuFactory.build(prisma, 'diurno');

    const body = {
      name: faker.commerce.product(),
      price: faker.number.int(),
      image: faker.image.url(),
      description: faker.commerce.productDescription(),
      menuId: menu.id,
      categoryId: faker.database.mongodbObjectId(),
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(body);
    expect(response.body.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.message).toContain(
      `Category of Id: ${body.categoryId} not found`,
    );
  });

  it('/POST products => should return CREATE a new category', async () => {
    const menu = await MenuFactory.build(prisma, 'diurno');
    const category = await CategoryFactory.build(prisma);

    const body = {
      name: faker.commerce.product(),
      price: faker.number.int(),
      image: faker.image.url(),
      description: faker.commerce.productDescription(),
      menuId: menu.id,
      categoryId: category.id,
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(body);

    expect(response.statusCode).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(body);
  });

  it('/GET products => should response with OK and array of products', async () => {
    const menu = await MenuFactory.build(prisma, 'diurno');
    const category = await CategoryFactory.build(prisma);
    const product1 = await ProductFactory.build(prisma, menu.id, category.id);
    const product2 = await ProductFactory.build(prisma, menu.id, category.id);

    const response = await request(app.getHttpServer()).get('/products');
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual(expect.arrayContaining([product1, product2]));
  });

  it('/GET products => should response with OK and return a product by Id', async () => {
    const menu = await MenuFactory.build(prisma, 'diurno');
    const category = await CategoryFactory.build(prisma);
    const product = await ProductFactory.build(prisma, menu.id, category.id);

    const response = await request(app.getHttpServer()).get(
      `/products/${product.id}`,
    );

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual(product);
  });

  it('/GET products => should response with NOT FOUND if productId does not exists', async () => {
    await MenuFactory.build(prisma, 'diurno');
    await CategoryFactory.build(prisma);
    const productId = faker.database.mongodbObjectId();

    const response = await request(app.getHttpServer()).get(
      `/products/${productId}`,
    );
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(
      `Product of Id ${productId} not found`,
    );
  });

  it('/PATCH products => should response with NOT FOUND when product id does not exists', async () => {
    const menu = await MenuFactory.build(prisma, 'diurno');
    const category = await CategoryFactory.build(prisma);
    await ProductFactory.build(prisma, menu.id, category.id);
    const productId = faker.database.mongodbObjectId();

    const response = await request(app.getHttpServer())
      .patch(`/products/${productId}`)
      .send({
        name: 'Bebida',
      });

    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(
      `Product of Id ${productId} not found`,
    );
  });

  it('/PATCH products => should response with NOT FOUND when menu id does not exists', async () => {
    const menuId = faker.database.mongodbObjectId();
    const menu = await MenuFactory.build(prisma, 'diurno');
    const category = await CategoryFactory.build(prisma);
    const product = await ProductFactory.build(prisma, menu.id, category.id);

    const response = await request(app.getHttpServer())
      .patch(`/products/${product.id}`)
      .send({
        menuId,
      });
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(`Menu ${menuId} not found`);
  });

  it('/PATCH products => should response with NOT FOUND when category id does not exists', async () => {
    const categoryId = faker.database.mongodbObjectId();
    const menu = await MenuFactory.build(prisma, 'diurno');
    const category = await CategoryFactory.build(prisma);
    const product = await ProductFactory.build(prisma, menu.id, category.id);

    const response = await request(app.getHttpServer())
      .patch(`/products/${product.id}`)
      .send({
        categoryId,
      });
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(
      `Category of Id: ${categoryId} not found`,
    );
  });

  it('/PATCH products => should response with OK and return product update', async () => {
    const menu = await MenuFactory.build(prisma, 'diurno');
    const category = await CategoryFactory.build(prisma);
    const product = await ProductFactory.build(prisma, menu.id, category.id);

    const response = await request(app.getHttpServer())
      .patch(`/products/${product.id}`)
      .send({
        name: 'Salgado',
      });
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.name).toEqual('Salgado');
  });

  it('/DELETE products => should return NOT FOUND when product id does not exists', async () => {
    const menu = await MenuFactory.build(prisma, 'diurno');
    const category = await CategoryFactory.build(prisma);
    await ProductFactory.build(prisma, menu.id, category.id);
    const productId = faker.database.mongodbObjectId();

    const response = await request(app.getHttpServer()).delete(
      `/products/${productId}`,
    );
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(
      `Product of Id ${productId} not found`,
    );
  });

  it('/DELETE products => should return OK and remove the products', async () => {
    const menu = await MenuFactory.build(prisma, 'diurno');
    const category = await CategoryFactory.build(prisma);
    const product = await ProductFactory.build(prisma, menu.id, category.id);
    const response = await request(app.getHttpServer()).delete(
      `/products/${product.id}`,
    );

    expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
    expect(
      await prisma.products.findFirst({
        where: { id: product.id },
      }),
    ).toBeNull();
  });
});
