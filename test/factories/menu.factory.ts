import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/prisma/prisma.service';

export class MenuFactory {
  static async build(prisma: PrismaService, type: 'diurno' | 'noturno') {
    return prisma.menus.create({
      data: {
        name: faker.commerce.product(),
        type,
      },
    });
  }
}
