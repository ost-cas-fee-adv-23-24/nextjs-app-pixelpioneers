import React from 'react';
import { Heading, HeadingLevel } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

export default async function Home() {
    return (
        <header className="px-m md:px-0">
            <Heading variant={HeadingLevel.H2} className="text-primary-600">
                Willkommen auf Mumble
            </Heading>
            <Heading variant={HeadingLevel.H4} className="text-slate-500">
                Voluptatem qui cumque voluptatem quia tempora dolores distinctio vel repellat dicta.
            </Heading>
        </header>
    );
}
