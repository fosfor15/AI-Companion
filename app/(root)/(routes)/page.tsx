import prismaClient from '@/lib/prisma-client';

import SearchInput from '@/components/search-input';
import Categories from '@/components/categories';
import Companions from '@/components/companions';

interface RootPageProps {
    searchParams: {
        categoryId: string;
        name: string;
    };
};

async function RootPage({ searchParams }: RootPageProps) {
    const categories = await prismaClient.category.findMany();

    const data = await prismaClient.companion.findMany({
        where: {
            categoryId: searchParams.categoryId,
            name: {
                search: searchParams.name
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            _count: {
                select: {
                    messages: true
                }
            }
        }
    });

    return (
        <div className="h-full p-4 space-y-2">
            <SearchInput />
            <Categories data={categories} />
            <Companions data={data} />
        </div>
    );
}

export default RootPage;
