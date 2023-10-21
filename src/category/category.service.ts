import { Injectable } from '@nestjs/common';
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
    const result = await this.categoryRepository.findOne(id);
    if (!result) {
      throw new CategoryNotFoundException(id);
    }
    return result;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const result = await this.categoryRepository.update(id, updateCategoryDto);
    if (!result) {
      throw new CategoryNotFoundException(id);
    }
    return result;
  }

  async remove(id: string) {
    const result = await this.categoryRepository.remove(id);
    if (!result) {
      throw new CategoryNotFoundException(id);
    }
    return result;
  }
}
