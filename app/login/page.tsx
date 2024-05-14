'use client';
import React from 'react';
import {
    Heading,
    HeadingLevel,
    Paragraph,
    ParagraphSize,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import LoginButton from '@/src/components/login/login-button';
import { useSession } from 'next-auth/react';

export default function LoginPage() {
    const { status } = useSession();
    return (
        <section className="flex w-full flex-col items-center gap-s p-m text-center md:w-container md:p-0">
            <Heading variant={HeadingLevel.H3} className="max-w-2xl text-secondary-900">
                Verpasse nichts mehr...
            </Heading>
            <Paragraph className="text-secondary-600" size={ParagraphSize.M}>
                Logge dich ein, damit du deine Meinung teilen kannst!
            </Paragraph>
            <div className="mt-m">
                <LoginButton isLoggedIn={status === 'authenticated'} />
            </div>
        </section>
    );
}
