import { PrismaClient } from "@prisma/client";
import { beforeAll, afterAll, afterEach } from "@jest/globals";

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`;
  await prisma.$executeRaw`TRUNCATE TABLE Task;`;
  await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`;
});
