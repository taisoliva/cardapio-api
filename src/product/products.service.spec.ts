import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { AppModule } from 'src/app.module';
import { faker } from '@faker-js/faker';
import { ProductNotFoundException } from 'src/exceptions/product-not-found.exception';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsServices', () => {
  let service: ProductsService;
  let repository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<ProductsRepository>(ProductsRepository);
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
});
