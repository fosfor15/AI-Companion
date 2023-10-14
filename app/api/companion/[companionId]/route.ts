import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';
import prismaClient from '@/lib/prisma-client';

import { CompanionIdProps } from '@/app/(root)/(routes)/companion/[companionId]/page';


export async function PATCH(req: Request, { params }: CompanionIdProps) {
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryId } = body;

        if (!params.companionId) {
            return new NextResponse("Companion ID required", { status: 400 });
        }

        if (!user || !user.id || !user.firstName) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        const companion = await prismaClient.companion.update({
            where: {
                id: params.companionId
            },
            data: {
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions,
                seed
            }
        });

        return NextResponse.json(companion);
    } catch (error) {
        console.log('[COMPANION_PATCH]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
