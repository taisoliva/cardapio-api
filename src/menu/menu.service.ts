import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuRepository } from './menu.repository';
import { MenuNotFoundException } from '../exceptions/menu-not-found.exception';

@Injectable()
export class MenuService {
  constructor(private readonly menuRepository: MenuRepository) {}

  async create(createMenuDto: CreateMenuDto) {
    return await this.menuRepository.create(createMenuDto);
  }

  async findAll(type: string) {
    return await this.menuRepository.findAll(type);
  }

  async findOne(id: string) {
    this.verifyLengthOfID(id);
    const result = await this.menuRepository.findOne(id);
    if (!result) {
      throw new MenuNotFoundException(id);
    }
    return result;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    this.verifyLengthOfID(id);
    await this.findOne(id);
    return await this.menuRepository.update(id, updateMenuDto);
  }

  async remove(id: string) {
    this.verifyLengthOfID(id);
    await this.findOne(id);
    return await this.menuRepository.remove(id);
  }

  verifyLengthOfID(id: string) {
    if (id.length !== 24) {
      throw new InternalServerErrorException('ID incorrect');
    }
  }
}
