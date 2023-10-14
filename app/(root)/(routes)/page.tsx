import prismaClient from '@/lib/prisma-client';

import SearchInput from '@/components/search-input';
import Categories from '@/components/categories';

async function RootPage() {
    const categories = await prismaClient.category.findMany();

    return (
        <div className="h-full p-4 space-y-2">
            <SearchInput />
            <Categories data={categories} />
        </div>
    );
}

export default RootPage;
