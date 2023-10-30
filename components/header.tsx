'use client';

import Link from 'next/link';
import { Poppins } from 'next/font/google';

import { SignedIn, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import ThemeSwitch from './theme-switch';
import MobileSidebar from './mobile-sidebar';

import { cn } from '@/lib/utils';
import { useProModal } from '@/app/hooks/use-pro-modal';


interface HeaderProps {
    isPro: boolean
}

const font = Poppins({
    weight: '600',
    subsets: ['latin']
});

function Header({ isPro }: HeaderProps) {
    const { onOpen } = useProModal();

    return (
        <header className="fixed w-full h-16 z-50 flex justify-between items-center px-4 py-2 border-b border-primary/10 bg-secondary">
            <div className="flex gap-x-2 items-center">
                <Link href="/">
                    <h2 className={cn(
                        "hidden md:block text-lg md:text-2xl font-semibold px-2 py-1",
                        font.className
                    )}>
                        AI Companion
                    </h2>
                </Link>

                <MobileSidebar isPro={isPro} />
            </div>

            <div className="flex gap-x-4 items-center">
                { !isPro && <Button
                    size="sm"
                    variant="premium"
                    onClick={onOpen}
                >
                    Upgrade
                    <Sparkles className="w-4 h-4 text-white fill-white ml-2" />
                </Button> }

                <ThemeSwitch />

                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>
        </header>
    );
}

export default Header;
