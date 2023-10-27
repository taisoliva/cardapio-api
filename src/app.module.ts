import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProductsModule } from './modules/product/products.module';
import { MenuModule } from './modules/menu/menu.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [PrismaModule, ProductsModule, MenuModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
