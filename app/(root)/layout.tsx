import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

import { checkSubscription } from '@/lib/subscription';

async function RootLayout({ children }: { children: React.ReactNode}) {
    const isPro = await checkSubscription();

    return (
        <>
            <Header isPro={isPro} />
            <div className="fixed hidden md:flex w-20 h-full mt-16 flex-col inset-y-0">
                <Sidebar isPro={isPro} />
            </div>

            <main className="md:pl-20 pt-16 h-full">
                { children }
            </main>
        </>
    );
}

export default RootLayout;
