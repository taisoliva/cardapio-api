import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';
import { CategoryNotFoundException } from 'src/exceptions/category-not-found.exception';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.create(createCategoryDto);
  }

  async findAll() {
    return await this.categoryRepository.findAll();
  }

  async findOne(id: string) {
    this.verifyLengthOfID(id);
    const result = await this.categoryRepository.findOne(id);
    if (!result) {
      throw new CategoryNotFoundException(id);
    }
    return result;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    this.verifyLengthOfID(id);
    await this.findOne(id);
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: string) {
    this.verifyLengthOfID(id);
    await this.findOne(id);
    return await this.categoryRepository.remove(id);
  }

  verifyLengthOfID(id: string) {
    if (id.length !== 24) {
      throw new InternalServerErrorException('ID incorrect');
    }
  }
}
