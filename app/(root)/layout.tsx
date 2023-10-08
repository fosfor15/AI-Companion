import Header from '@/components/header';

function RootLayout({ children }: { children: React.ReactNode}) {
    return (
        <>
            <Header />
            <main>
                { children }
            </main>
        </>
    );
}

export default RootLayout;
