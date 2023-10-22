import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { E2EUtils } from './utils/e2e-utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { faker } from '@faker-js/faker';
import { CategoryFactory } from './factories/category.factory';

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

  it('/POST category => should return BAD REQUEST if body is empty', async () => {
    const response = await request(app.getHttpServer())
      .post('/category')
      .send({});
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toContain('name should not be empty');
  });

  it('/POST category => should return BAD REQUEST if name is not a string', async () => {
    const response = await request(app.getHttpServer()).post('/category').send({
      name: faker.number.int(),
    });
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toContain('name must be a string');
  });

  it('/POST category => should return CREATE a new category', async () => {
    const body = {
      name: faker.commerce.productName(),
    };
    const response = await request(app.getHttpServer())
      .post('/category')
      .send(body);

    expect(response.statusCode).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(body);
  });

  it('/GET category => should response with OK and empty array', async () => {
    const response = await request(app.getHttpServer()).get('/category');
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toHaveLength(0);
  });

  it('/GET category => should response with OK and return a array with 2 elements', async () => {
    const category1 = await CategoryFactory.build(prisma);
    const category2 = await CategoryFactory.build(prisma);

    const response = await request(app.getHttpServer()).get('/category');
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([category1, category2]),
    );
  });

  it('/GET category => should response with OK and category by Id', async () => {
    const category = await CategoryFactory.build(prisma);

    const response = await request(app.getHttpServer()).get(
      `/category/${category.id}`,
    );
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual(category);
  });

  it('/GET category => should response with Internal Server Error and ID incorret message', async () => {
    await CategoryFactory.build(prisma);

    const response = await request(app.getHttpServer()).get(
      `/category/3123712739128739182739273912739792173912739279317293`,
    );
    expect(response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.body.message).toEqual('ID incorrect');
  });

  it('/GET category => should response with NOT FOUND if category id does not exists', async () => {
    const categoryId = faker.database.mongodbObjectId();
    await CategoryFactory.build(prisma);
    const response = await request(app.getHttpServer()).get(
      `/category/${categoryId}`,
    );
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(
      `Category of Id: ${categoryId} not found`,
    );
  });

  it('/PATCH category => should response with NOT FOUND when category id does not exists', async () => {
    const categoryId = faker.database.mongodbObjectId();
    await CategoryFactory.build(prisma);
    const response = await request(app.getHttpServer())
      .patch(`/category/${categoryId}`)
      .send({
        name: 'Bebida',
      });
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(
      `Category of Id: ${categoryId} not found`,
    );
  });

  it('/PATCH category => should response with BAD REQUEST when name body is empty', async () => {
    const category = await CategoryFactory.build(prisma);
    const response = await request(app.getHttpServer())
      .patch(`/category/${category.id}`)
      .send({
        name: '',
      });
    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toContain('name should not be empty');
  });

  it('/PATCH category => should response with OK and return category update', async () => {
    const category = await CategoryFactory.build(prisma);
    const response = await request(app.getHttpServer())
      .patch(`/category/${category.id}`)
      .send({
        name: 'Salgado',
      });
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.name).toEqual('Salgado');
  });

  it('/DELETE category => should return NOT FOUND when category id does not exists', async () => {
    const categoryId = faker.database.mongodbObjectId();
    const response = await request(app.getHttpServer()).delete(
      `/category/${categoryId}`,
    );
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(
      `Category of Id: ${categoryId} not found`,
    );
  });

  it('/DELETE category => should return OK and remove the category', async () => {
    const category = await CategoryFactory.build(prisma);
    const response = await request(app.getHttpServer()).delete(
      `/category/${category.id}`,
    );

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual(category);
    expect(
      await prisma.categories.findFirst({
        where: { id: category.id },
      }),
    ).toBeNull();
  });
});
