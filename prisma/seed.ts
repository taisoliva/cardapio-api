import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const menu = await prisma.menus.findFirst();
  const category = await prisma.categories.findFirst();
  if (!menu) {
    await prisma.menus.create({
      data: {
        name: 'Hora do Lanche',
        type: 'diurno',
      },
    });
  }

  if (!category) {
    await prisma.categories.create({
      data: {
        name: 'Salgado',
      },
    });
  }
}

main();
