import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

function RootLayout({ children }: { children: React.ReactNode}) {
    return (
        <>
            <Header />
            <div className="fixed hidden md:flex w-20 h-full mt-16 flex-col inset-y-0">
                <Sidebar />
            </div>

            <main>
                { children }
            </main>
        </>
    );
}

export default RootLayout;
