import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { MenuRepository } from 'src/menu/menu.repository';
import { MenuNotFoundException } from 'src/exceptions/menu-not-found.exception';
import { MenuService } from 'src/menu/menu.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductsRepository,
    private menuService: MenuService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    await this.menuService.findOne(createProductDto.menuId);

    return await this.productRepository.create(createProductDto);
  }

  findAll() {
    return this.productRepository.findAll();
  }

  findOne(id: string) {
    return this.productRepository.findOne(id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: string) {
    return this.productRepository.remove(id);
  }
}
