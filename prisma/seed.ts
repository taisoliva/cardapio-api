import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.menus.create({
    data: {
      name: faker.company.name(),
      type: 'diurno',
    },
  });

  await prisma.categories.create({
    data: {
      name: faker.commerce.product(),
    },
  });
}

main();
