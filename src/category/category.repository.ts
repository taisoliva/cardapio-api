import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.categories.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return await this.prisma.categories.findMany({
      include: { products: true },
    });
  }

  async findOne(id: string) {
    return await this.prisma.categories.findFirst({
      where: { id },
      include: { products: true },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.prisma.categories.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.categories.delete({
      where: { id },
    });
  }
}
