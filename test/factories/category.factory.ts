import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/modules/prisma/prisma.service';

export class CategoryFactory {
  static async build(prisma: PrismaService) {
    return prisma.categories.create({
      data: {
        name: faker.commerce.product(),
      },
    });
  }
}
