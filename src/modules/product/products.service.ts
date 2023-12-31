import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { MenuService } from 'src/modules/menu/menu.service';
import { CategoryService } from 'src/modules/category/category.service';
import { ProductNotFoundException } from 'src/exceptions/product-not-found.exception';
import verifyLengthOfID from 'src/utils/verify-length-id';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductsRepository,
    private menuService: MenuService,
    private categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    await this.menuService.findOne(createProductDto.menuId);
    await this.categoryService.findOne(createProductDto.categoryId);

    return await this.productRepository.create(createProductDto);
  }

  async findAll() {
    return await this.productRepository.findAll();
  }

  async findOne(id: string) {
    verifyLengthOfID(id);
    const result = await this.productRepository.findOne(id);
    if (!result) {
      throw new ProductNotFoundException(id);
    }
    return result;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    verifyLengthOfID(id);
    await this.findOne(id);
    await this.verifyMenuIdAndCategoryId(updateProductDto);
    return this.productRepository.update(id, updateProductDto);
  }

  async remove(id: string) {
    verifyLengthOfID(id);
    await this.findOne(id);
    return this.productRepository.remove(id);
  }

  async verifyMenuIdAndCategoryId(updateProductDto: UpdateProductDto) {
    if ('menuId' in updateProductDto) {
      await this.menuService.findOne(updateProductDto.menuId);
    }
    if ('categoryId' in updateProductDto) {
      await this.categoryService.findOne(updateProductDto.categoryId);
    }
  }
}
