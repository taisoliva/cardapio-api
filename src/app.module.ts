import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './product/products.module';
import { MenuModule } from './menu/menu.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [PrismaModule, ProductsModule, MenuModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
