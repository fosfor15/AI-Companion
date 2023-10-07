import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs'

function Header() {
    return (
        <header className="flex justify-between p-5">
            <Link
                className="text-base font-semibold text-blue-700 px-2 py-1"
                href="/"
            >
                AI Companion
            </Link>

            <SignedIn>
                <UserButton
                    afterSignOutUrl="/"
                />
            </SignedIn>
        </header>
    );
}

export default Header;
