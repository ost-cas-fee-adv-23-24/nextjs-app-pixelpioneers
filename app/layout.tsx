import React, { ReactNode } from 'react';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import Navigation from '@/src/components/navigation/navigation';
import MobileNavigation from '@/src/components/navigation/mobile-navigation';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Poppins } from 'next/font/google';
import clsx from 'clsx';
import MobileHeader from '@/src/components/header/mobile-header';
import { getLoggedInUser } from '@/app/actions/utils';

export const metadata: Metadata = {
    manifest: '/manifest.json',
    title: 'Mumble App',
    description: 'Generated by PixelPioneers',
};

export const viewport: Viewport = {
    themeColor: '#7C3AED',
};

const poppins = Poppins({
    variable: '--font-poppins',
    subsets: ['latin-ext'],
    weight: ['500', '600', '700'],
    fallback: ['arial', 'sans-serif'],
    adjustFontFallback: false,
    display: 'swap',
});

export default async function RootLayout({ children }: { children: ReactNode }) {
    const session = await auth();
    const user = await getLoggedInUser();

    return (
        <html lang="en" dir="ltr">
            <body className={clsx('bg-secondary-100', poppins.className)}>
                <SessionProvider session={session}>
                    <MobileHeader />
                    <Navigation user={user} />
                    <main className="mb-[100px] mt-[50px] flex flex-col items-center md:mb-l md:mt-[112px]">
                        {children}
                    </main>
                    <MobileNavigation user={user} />
                </SessionProvider>
            </body>
        </html>
    );
}
