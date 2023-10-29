import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs';

import prismaClient from '@/lib/prisma-client';
import stripeClient from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';


const settingsUrl = absoluteUrl('/settings');

export async function GET() {
    try {
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const userSubscription = await prismaClient.userSubscription.findUnique({
            where: {
                userId
            }
        });

        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripeClient.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl
            });

            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }

        const stripeSession = await stripeClient.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ['card'],
            mode: 'subscription',
            billing_address_collection: 'auto',
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: 'Companion Pro',
                            description: 'Create Custom AI Companions'
                        },
                        unit_amount: 999,
                        recurring: {
                            interval: 'month'
                        }
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId
            }
        });

        return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    } catch (error) {
        console.log('[STRIPE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
