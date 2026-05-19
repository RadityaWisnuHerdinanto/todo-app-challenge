/**
 * Database configuration and Prisma client
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle disconnection
process.on("SIGINT", async () => {
  await prisma.$disconnect();
});

export default prisma;
