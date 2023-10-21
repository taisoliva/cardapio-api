import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { MenuService } from 'src/menu/menu.service';
import { CategoryService } from 'src/category/category.service';
import { ProductNotFoundException } from 'src/exceptions/product-not-found.exception';

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
    this.verifyLengthOfID(id);
    const result = await this.productRepository.findOne(id);
    if (!result) {
      throw new ProductNotFoundException(id);
    }
    return result;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    this.verifyLengthOfID(id);
    await this.findOne(id);
    return this.productRepository.update(id, updateProductDto);
  }

  async remove(id: string) {
    this.verifyLengthOfID(id);
    await this.findOne(id);
    return this.productRepository.remove(id);
  }

  verifyLengthOfID(id: string) {
    if (id.length !== 24) {
      throw new InternalServerErrorException('ID incorrect');
    }
  }
}
