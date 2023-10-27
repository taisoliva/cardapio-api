import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/modules/prisma/prisma.service';

export class ProductFactory {
  static async build(
    prisma: PrismaService,
    menuId: string,
    categoryId: string,
  ) {
    return prisma.products.create({
      data: {
        name: faker.commerce.product(),
        price: faker.number.int(),
        image: faker.image.url(),
        description: faker.commerce.productDescription(),
        menuId,
        categoryId,
      },
    });
  }
}
