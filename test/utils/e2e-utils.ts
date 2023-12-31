import { PrismaService } from 'src/modules/prisma/prisma.service';

export class E2EUtils {
  static async cleanDB(prisma: PrismaService) {
    await prisma.products.deleteMany();
    await prisma.menus.deleteMany();
    await prisma.categories.deleteMany();
  }
}
