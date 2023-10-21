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
    if (this.verifyLengthOfID(id))
      throw new InternalServerErrorException('ID incorrect');
    return await this.productRepository.findOne(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (this.verifyLengthOfID(id))
      throw new InternalServerErrorException('ID incorrect');
    const result = await this.productRepository.findOne(id);

    if (!result) {
      throw new ProductNotFoundException(id);
    }

    return this.productRepository.update(id, updateProductDto);
  }

  async remove(id: string) {
    if (this.verifyLengthOfID(id))
      throw new InternalServerErrorException('ID incorrect');
    const result = await this.productRepository.findOne(id);

    if (!result) {
      throw new ProductNotFoundException(id);
    }
    return this.productRepository.remove(id);
  }

  verifyLengthOfID(id: string) {
    if (id.length < 24) {
      return true;
    }
    return false;
  }
}
