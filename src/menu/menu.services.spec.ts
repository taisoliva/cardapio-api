import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { MenuService } from './menu.service';
import { MenuRepository } from './menu.repository';
import { faker } from '@faker-js/faker';
import { MenuNotFoundException } from 'src/exceptions/menu-not-found.exception';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';

describe('ProductsServices', () => {
  let service: MenuService;
  let repository: MenuRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<MenuService>(MenuService);
    repository = module.get<MenuRepository>(MenuRepository);
  });

  it('should create a new menu', async () => {
    const mockMenu = {
      id: faker.database.mongodbObjectId(),
      name: faker.commerce.productName(),
      type: 'diurno',
    };

    jest.spyOn(repository, 'create').mockImplementationOnce(() => {
      return Promise.resolve(mockMenu);
    });
    const promise = await service.create(mockMenu);
    expect(promise).toEqual(mockMenu);
  });

  it('should return an error if menuId does not exists ', () => {
    const menuId = faker.database.mongodbObjectId();
    jest.spyOn(repository, 'findOne').mockReturnValue(null);
    const promise = service.findOne(menuId);
    expect(promise).rejects.toThrow(new MenuNotFoundException(menuId));
  });

  it('should return an error if length productId is lower than 24 characters ', () => {
    const productId = 'c3';
    const promise = service.findOne(productId);
    expect(promise).rejects.toThrow(
      new InternalServerErrorException('ID incorrect'),
    );
  });

  it('should return an error if length productId is larger than 24 characters', () => {
    const productId = 'c30e13246fb72dd2f8497bc69093eioqqueoqwoue';
    const promise = service.findOne(productId);
    expect(promise).rejects.toThrow(
      new InternalServerErrorException('ID incorrect'),
    );
  });

  it('should return an error if menuId does not exists when try updated', () => {
    const productId = faker.database.mongodbObjectId();
    const dto = new CreateMenuDto();
    jest.spyOn(repository, 'findOne').mockReturnValue(null);
    const promise = service.update(productId, dto);
    expect(promise).rejects.toThrow(new MenuNotFoundException(productId));
  });

  it('should return an error if length menuId is different than 24 characters when try update', () => {
    const productId = 'c30e13246fb72dd2f8497bc69093eioqqueoqwoue';
    const dto = new CreateMenuDto();
    const promise = service.update(productId, dto);
    expect(promise).rejects.toThrow(
      new InternalServerErrorException('ID incorrect'),
    );
  });

  it('should return an error if menuId does not exists when try delete', () => {
    const productId = faker.database.mongodbObjectId();
    jest.spyOn(repository, 'findOne').mockReturnValue(null);
    const promise = service.remove(productId);
    expect(promise).rejects.toThrow(new MenuNotFoundException(productId));
  });

  it('should return an error if length menuId is different than 24 characters when try delete', () => {
    const productId = 'c30e13246fb72dd2f8497bc69093eioqqueoqwoue';
    const promise = service.remove(productId);
    expect(promise).rejects.toThrow(
      new InternalServerErrorException('ID incorrect'),
    );
  });
});
