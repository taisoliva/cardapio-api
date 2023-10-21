import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuRepository } from './menu.repository';

@Module({
  controllers: [MenuController],
  providers: [MenuService, MenuRepository],
})
export class MenuModule {}
