import { auth } from '@clerk/nextjs';
import prismaClient from './prisma-client';

const DAY_IN_MS = 86_400_000;

export async function checkSubscription(): Promise<boolean> {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    const userSubscription = await prismaClient.userSubscription.findUnique({
        where: {
            userId: userId,
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
        },
    });

    if (!userSubscription) {
        return false;
    }

    const isValid =
        userSubscription.stripePriceId &&
        userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

    return !!isValid;
}

