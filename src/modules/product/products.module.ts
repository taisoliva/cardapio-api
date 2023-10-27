import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { MenuModule } from 'src/modules/menu/menu.module';
import { CategoryModule } from 'src/modules/category/category.module';

@Module({
  imports: [MenuModule, CategoryModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
