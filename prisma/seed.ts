import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { DESTINOS_FALLBACK, COMPANHIAS_FALLBACK } from "../lib/constants";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  for (const destino of DESTINOS_FALLBACK) {
    await prisma.destination.upsert({
      where: { nome: destino.nome },
      update: destino,
      create: destino,
    });
  }

  for (const nome of COMPANHIAS_FALLBACK) {
    await prisma.company.upsert({
      where: { nome },
      update: {},
      create: { nome },
    });
  }

  console.log("Seed concluído: destinos e companhias cadastrados.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
