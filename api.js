import pkg from "./generated/prisma/index.js";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  try {
    const rows = await prisma.$queryRaw`
      SELECT *
      FROM products_with_categories
    `;
    console.log(JSON.stringify(rows, null, 2));
  } catch (err) {
    console.error("Error al obtener products_with_categories:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
