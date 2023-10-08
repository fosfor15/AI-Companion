import Header from '@/components/header';

function RootLayout({ children }: { children: React.ReactNode}) {
    return (
        <>
            <Header />
            <main className="h-full">
                { children }
            </main>
        </>
    );
}

export default RootLayout;
