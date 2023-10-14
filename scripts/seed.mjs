import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

async function main() {
    try {
        await prismaClient.category.createMany({
            data: [
                { name: 'Famous People' },
                { name: 'Movies & TV' },
                { name: 'Musicians' },
                { name: 'Games' },
                { name: 'Animals' },
                { name: 'Philosophy' },
                { name: 'Scientists' }
            ]
        });
    } catch (error) {
        console.error('Error seeding default categories:', error);
    } finally {
        await prismaClient.$disconnect();
    }
}

main();
