import { PrismaClient } from "@prisma/client";

function createPrismaClient() {
  const url = process.env.DATABASE_URL;

  if (url?.startsWith("postgresql://") || url?.startsWith("postgres://")) {
    const { PrismaNeon } = require("@prisma/adapter-neon");
    const { neonConfig } = require("@neondatabase/serverless");
    const { Pool } = require("@neondatabase/serverless");

    neonConfig.fetchConnectionCache = true;
    const pool = new Pool({ connectionString: url });
    const adapter = new PrismaNeon(pool);
    return new PrismaClient({ adapter });
  }

  const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
  const adapter = new PrismaBetterSqlite3({
    url: url || "file:./dev.db",
  });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
