import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenuRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto) {
    return await this.prisma.menus.create({
      data: createMenuDto,
    });
  }

  async findAll(type: string) {
    return await this.prisma.menus.findMany({
      where: { type },
      include: {
        products: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.menus.findFirst({
      where: { id },
      include: {
        products: true,
      },
    });
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    return await this.prisma.menus.update({
      where: { id },
      data: updateMenuDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.menus.delete({
      where: { id },
    });
  }
}
