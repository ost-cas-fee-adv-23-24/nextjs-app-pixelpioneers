import React from 'react';
import { Heading, HeadingLevel } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

export default async function HomePage() {
    return (
        <header className="flex flex-col gap-xs px-m md:px-0">
            <Heading variant={HeadingLevel.H2} className="text-primary-600">
                Willkommen auf Mumble
            </Heading>
            <Heading variant={HeadingLevel.H4} className="text-secondary-500">
                The newest of the news, right now and right here!
            </Heading>
        </header>
    );
}
