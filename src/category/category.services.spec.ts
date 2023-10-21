import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { faker } from '@faker-js/faker';
import { InternalServerErrorException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { CategoryNotFoundException } from 'src/exceptions/category-not-found.exception';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('ProductsServices', () => {
  let service: CategoryService;
  let repository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should return an error if categoryId does not exists ', () => {
    const categoryId = faker.database.mongodbObjectId();
    jest.spyOn(repository, 'findOne').mockReturnValue(null);
    const promise = service.findOne(categoryId);
    expect(promise).rejects.toThrow(new CategoryNotFoundException(categoryId));
  });

  it('should return an error if length categoryId is lower than 24 characters ', () => {
    const categoryId = 'c3';
    const promise = service.findOne(categoryId);
    expect(promise).rejects.toThrow(
      new InternalServerErrorException('ID incorrect'),
    );
  });

  it('should return an error if length categoryId is larger than 24 characters', () => {
    const categoryId = 'c30e13246fb72dd2f8497bc69093eioqqueoqwoue';
    const promise = service.findOne(categoryId);
    expect(promise).rejects.toThrow(
      new InternalServerErrorException('ID incorrect'),
    );
  });

  it('should return an error if categoryId does not exists when try updated', () => {
    const categoryId = faker.database.mongodbObjectId();
    const dto = new CreateCategoryDto();
    jest.spyOn(repository, 'findOne').mockReturnValue(null);
    const promise = service.update(categoryId, dto);
    expect(promise).rejects.toThrow(new CategoryNotFoundException(categoryId));
  });

  it('should return an error if length categoryId is different than 24 characters when try update', () => {
    const categoryId = 'c30e13246fb72dd2f8497bc69093eioqqueoqwoue';
    const dto = new CreateCategoryDto();
    const promise = service.update(categoryId, dto);
    expect(promise).rejects.toThrow(
      new InternalServerErrorException('ID incorrect'),
    );
  });

  it('should return an error if categoryId does not exists when try delete', () => {
    const categoryId = faker.database.mongodbObjectId();
    jest.spyOn(repository, 'findOne').mockReturnValue(null);
    const promise = service.remove(categoryId);
    expect(promise).rejects.toThrow(new CategoryNotFoundException(categoryId));
  });

  it('should return an error if length categoryId is different than 24 characters when try delete', () => {
    const categoryId = 'c30e13246fb72dd2f8497bc69093eioqqueoqwoue';
    const promise = service.remove(categoryId);
    expect(promise).rejects.toThrow(
      new InternalServerErrorException('ID incorrect'),
    );
  });
});
