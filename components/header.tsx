'use client';

import Link from 'next/link';
import { Menu, Sparkles } from 'lucide-react';
import { SignedIn, UserButton } from '@clerk/nextjs'
import { Poppins } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ThemeSwitch from './theme-switch';

const font = Poppins({
    weight: '600',
    subsets: ['latin']
});

function Header() {
    return (
        <header className="fixed w-full z-50 flex justify-between items-center px-4 py-2 border-primary/10 bg-secondary">
            <div className="flex gap-x-2 items-center">
                <Link href="/">
                    <h2 className={cn(
                        "hidden md:block text-lg md:text-2xl font-semibold px-2 py-1",
                        font.className
                    )}>
                        AI Companion
                    </h2>
                </Link>

                <Menu className="block md:hidden" />
            </div>

            <div className="flex gap-x-4 items-center">
                <Button
                    size="sm"
                    variant="premium"
                >
                    Upgrade
                    <Sparkles className="w-4 h-4 text-white fill-white ml-2" />
                </Button>

                <ThemeSwitch />

                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>
        </header>
    );
}

export default Header;
