import Stripe from 'stripe';

const stripeClient = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: '2023-10-16',
    typescript: true
});

export default stripeClient;
