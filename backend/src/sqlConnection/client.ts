import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient({
  datasources: { db: { url: process.env.POSTGRESQL_URL } },
});

export default prisma;
