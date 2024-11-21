import { PrismaClient } from "@prisma/client";
import { products } from "./data/product";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  for (const product of products) {
    const upsertedProduct = await prisma.product.upsert({
      where: { name: product.name },
      update: product,
      create: product,
    });
    console.log("Seeding product completed:", upsertedProduct);
  }

  console.info("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
