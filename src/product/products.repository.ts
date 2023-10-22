import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Products } from '@prisma/client';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Products> {
    return await this.prisma.products.create({
      data: createProductDto,
    });
  }

  async findAll(): Promise<Products[]> {
    return await this.prisma.products.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.products.findFirst({
      where: { id },
      include: {
        categories: true,
        menus: true,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.prisma.products.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.products.delete({
      where: { id },
    });
  }
}
