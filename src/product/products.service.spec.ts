import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { AppModule } from 'src/app.module';
import { faker } from '@faker-js/faker';
import { ProductNotFoundException } from 'src/exceptions/product-not-found.exception';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryService } from 'src/category/category.service';
import { Products } from '@prisma/client';
import { MenuNotFoundException } from 'src/exceptions/menu-not-found.exception';
import { MenuService } from 'src/menu/menu.service';
import { CategoryNotFoundException } from 'src/exceptions/category-not-found.exception';

describe('ProductsServices', () => {
  let service: ProductsService;
  let repository: ProductsRepository;
  let serviceCategory: CategoryService;
  let serviceMenu: MenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductsRepository>(ProductsRepository);
    serviceCategory = module.get<CategoryService>(CategoryService);
    serviceMenu = module.get<MenuService>(MenuService);

    jest.clearAllMocks();
  });

  it('should return an error if menuId does not exists', async () => {
    const mockCategory = {
      id: faker.database.mongodbObjectId(),
      name: faker.commerce.productName(),
    };

    const mockProduct = {
      name: faker.commerce.productName(),
      price: faker.number.int(),
      image: faker.image.url(),
      description: faker.commerce.productDescription(),
      menuId: faker.database.mongodbObjectId(),
      categoryId: mockCategory.id,
    };

    jest.spyOn(serviceCategory, 'findOne').mockImplementationOnce((): any => {
      return Promise.resolve(mockCategory);
    });

    const promise = service.create(mockProduct);
    expect(promise).rejects.toThrow(
      new MenuNotFoundException(mockProduct.menuId),
    );
  });

  it('should return an error if categoryId does not exists', async () => {
    const mockMenu = {
      id: faker.database.mongodbObjectId(),
      name: faker.commerce.productName(),
      type: 'diurno',
    };

    const mockProduct = {
      name: faker.commerce.productName(),
      price: faker.number.int(),
      image: faker.image.url(),
      description: faker.commerce.productDescription(),
      menuId: mockMenu.id,
      categoryId: faker.database.mongodbObjectId(),
    };

    jest.spyOn(serviceMenu, 'findOne').mockImplementationOnce((): any => {
      return Promise.resolve(mockMenu);
    });

    const promise = service.create(mockProduct);
    expect(promise).rejects.toThrow(
      new CategoryNotFoundException(mockProduct.categoryId),
    );
  });

  it('should return an error if productId does not exists ', () => {
    const productId = faker.database.mongodbObjectId();
    jest.spyOn(repository, 'findOne').mockReturnValue(null);
    const promise = service.findOne(productId);
    expect(promise).rejects.toThrow(new ProductNotFoundException(productId));
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

  it('should return an error if productId does not exists when try updated', () => {
    const productId = faker.database.mongodbObjectId();
    const dto = new CreateProductDto();
    jest.spyOn(repository, 'findOne').mockReturnValue(null);
    const promise = service.update(productId, dto);
    expect(promise).rejects.toThrow(new ProductNotFoundException(productId));
  });

  it('should return an error if length productId is different than 24 characters when try update', () => {
    const productId = 'c30e13246fb72dd2f8497bc69093eioqqueoqwoue';
    const dto = new CreateProductDto();
    const promise = service.update(productId, dto);
    expect(promise).rejects.toThrow(
      new InternalServerErrorException('ID incorrect'),
    );
  });

  it('should return an error if productId does not exists when try delete', () => {
    const productId = faker.database.mongodbObjectId();
    jest.spyOn(repository, 'findOne').mockReturnValue(null);
    const promise = service.remove(productId);
    expect(promise).rejects.toThrow(new ProductNotFoundException(productId));
  });

  it('should return an error if length productId is different than 24 characters when try delete', () => {
    const productId = 'c30e13246fb72dd2f8497bc69093eioqqueoqwoue';
    const promise = service.remove(productId);
    expect(promise).rejects.toThrow(
      new InternalServerErrorException('ID incorrect'),
    );
  });

  it('should return an error if menuId does not exists when try update product', async () => {
    const mockProduct = {
      id: faker.database.mongodbObjectId(),
      name: faker.commerce.productName(),
      price: faker.number.int(),
      image: faker.image.url(),
      description: faker.commerce.productDescription(),
      menuId: faker.database.mongodbObjectId(),
      categoryId: faker.database.mongodbObjectId(),
    };

    const updateProductDto = {
      menuId: faker.database.mongodbObjectId(),
    };

    jest
      .spyOn(repository, 'findOne')
      .mockImplementationOnce((): Promise<Products> => {
        return Promise.resolve(mockProduct);
      });

    const promise = service.update(mockProduct.id, updateProductDto);
    expect(promise).rejects.toThrow(
      new MenuNotFoundException(updateProductDto.menuId),
    );
  });

  it('should return an error if categoryId does not exists when try update product', async () => {
    const mockProduct = {
      id: faker.database.mongodbObjectId(),
      name: faker.commerce.productName(),
      price: faker.number.int(),
      image: faker.image.url(),
      description: faker.commerce.productDescription(),
      menuId: faker.database.mongodbObjectId(),
      categoryId: faker.database.mongodbObjectId(),
    };

    const updateProductDto = {
      categoryId: faker.database.mongodbObjectId(),
    };

    jest
      .spyOn(repository, 'findOne')
      .mockImplementationOnce((): Promise<Products> => {
        return Promise.resolve(mockProduct);
      });

    const promise = service.update(mockProduct.id, updateProductDto);
    expect(promise).rejects.toThrow(
      new CategoryNotFoundException(updateProductDto.categoryId),
    );
  });
});
