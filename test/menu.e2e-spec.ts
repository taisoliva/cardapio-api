import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { E2EUtils } from './utils/e2e-utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { faker } from '@faker-js/faker';
import { MenuFactory } from './factories/menu.factory';

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

  it('/POST menu => should return BAD REQUEST if body is empty', async () => {
    const response = await request(app.getHttpServer()).post('/menu').send({});
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toContain('name should not be empty');
    expect(response.body.message).toContain('type should not be empty');
  });

  it('/POST menu => should return BAD REQUEST if type body is empty', async () => {
    const response = await request(app.getHttpServer()).post('/menu').send({
      name: faker.commerce.productName(),
    });
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toContain('type should not be empty');
  });

  it('/POST menu => should return BAD REQUEST if type body is different of diurno or noturno', async () => {
    const response = await request(app.getHttpServer()).post('/menu').send({
      name: faker.commerce.productName(),
      type: 'aaa',
    });
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toContain('type must be a diurno or noturno');
  });

  it('/POST menu => should return CREATE a new menu', async () => {
    const body = {
      name: faker.commerce.productName(),
      type: 'diurno',
    };
    const response = await request(app.getHttpServer())
      .post('/menu')
      .send(body);

    expect(response.statusCode).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject(body);
  });

  it('/GET menu => should response with OK and empty array', async () => {
    const response = await request(app.getHttpServer()).get('/menu');
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toHaveLength(0);
  });

  it('/GET menu => should response with OK and empty array if query is not diurno or noturno', async () => {
    const response = await request(app.getHttpServer()).get('/menu?type=aaaa');
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toHaveLength(0);
  });

  it('/GET menu => should response with OK and return a array with elements if query diurno', async () => {
    const menu1 = await MenuFactory.build(prisma, 'diurno');
    const menu2 = await MenuFactory.build(prisma, 'diurno');
    await MenuFactory.build(prisma, 'noturno');

    const response = await request(app.getHttpServer()).get(
      '/menu?type=diurno',
    );
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual(expect.arrayContaining([menu1, menu2]));
  });

  it('/GET menu => should response with OK and return a array with 1 element if query noturno', async () => {
    await MenuFactory.build(prisma, 'diurno');
    await MenuFactory.build(prisma, 'diurno');
    const menu3 = await MenuFactory.build(prisma, 'noturno');

    const response = await request(app.getHttpServer()).get(
      '/menu?type=noturno',
    );
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual(expect.arrayContaining([menu3]));
  });

  it('/GET menu => should response with OK and menu by Id', async () => {
    const menu = await MenuFactory.build(prisma, 'noturno');

    const response = await request(app.getHttpServer()).get(`/menu/${menu.id}`);
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual(menu);
  });

  it('/GET menu => should response with Internal Server Error and ID incorret message', async () => {
    await MenuFactory.build(prisma, 'noturno');

    const response = await request(app.getHttpServer()).get(
      `/menu/3123712739128739182739273912739792173912739279317293`,
    );
    expect(response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.body.message).toEqual('ID incorrect');
  });

  it('/GET menu => should response with NOT FOUND if menu id does not exists', async () => {
    const menuId = faker.database.mongodbObjectId();
    await MenuFactory.build(prisma, 'noturno');
    const response = await request(app.getHttpServer()).get(`/menu/${menuId}`);
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(`Menu ${menuId} not found`);
  });

  it('/PATCH menu => should response with NOT FOUND when menu id does not exists', async () => {
    const menuId = faker.database.mongodbObjectId();
    await MenuFactory.build(prisma, 'noturno');
    const response = await request(app.getHttpServer())
      .patch(`/menu/${menuId}`)
      .send({
        name: 'Bebida',
      });
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(`Menu ${menuId} not found`);
  });

  it('/PATCH menu => should response with BAD REQUEST when name body is empty', async () => {
    const menu = await MenuFactory.build(prisma, 'noturno');
    const response = await request(app.getHttpServer())
      .patch(`/menu/${menu.id}`)
      .send({
        name: '',
      });
    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toContain('name should not be empty');
  });

  it('/PATCH menu => should response with BAD REQUEST when type body is not diurno or noturno', async () => {
    const menu = await MenuFactory.build(prisma, 'noturno');
    const response = await request(app.getHttpServer())
      .patch(`/menu/${menu.id}`)
      .send({
        type: 'aaaa',
      });
    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toContain('type must be a diurno or noturno');
  });

  it('/PATCH menu => should response with OK and return menu update', async () => {
    const menu = await MenuFactory.build(prisma, 'noturno');
    const response = await request(app.getHttpServer())
      .patch(`/menu/${menu.id}`)
      .send({
        type: 'diurno',
      });
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.type).toEqual('diurno');
  });

  it('/DELETE menu => should return NOT FOUND when menu id does not exists', async () => {
    const menuId = faker.database.mongodbObjectId();
    const response = await request(app.getHttpServer()).delete(
      `/menu/${menuId}`,
    );
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.body.message).toEqual(`Menu ${menuId} not found`);
  });

  it('/DELETE menu => should return OK and remove the menu', async () => {
    const menu = await MenuFactory.build(prisma, 'noturno');
    const response = await request(app.getHttpServer()).delete(
      `/menu/${menu.id}`,
    );

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual(menu);
    expect(
      await prisma.menus.findFirst({
        where: { id: menu.id },
      }),
    ).toBeNull();
  });
});
