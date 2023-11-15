import { PrismaClient } from "@prisma/client";

//code so that when the server is refreshed it does not try and create another prisma client

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined

}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({log: ['query'],})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma