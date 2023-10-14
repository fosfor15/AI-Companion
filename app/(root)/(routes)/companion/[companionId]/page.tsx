import prismaClient from '@/lib/prisma-client';
import CompanionForm from './components/companion-form';

export interface CompanionIdProps {
    params: {
        companionId: string
    }
}

async function CompanionPage({ params }: CompanionIdProps) {
    const companion = await prismaClient.companion.findUnique({
        where: {
            id: params.companionId
        }
    });

    const categories = await prismaClient.category.findMany();

    return (
        <CompanionForm
            initialData={companion}
            categories={categories}
        />
    );
}

export default CompanionPage;
