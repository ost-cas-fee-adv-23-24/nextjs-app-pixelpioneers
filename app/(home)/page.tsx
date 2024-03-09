import React from 'react';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import NewPost from '@/src/compositions/post/form-post';
import { Heading, HeadingLevel } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

export default async function Home() {
    const session = await auth();
    return (
        <>
            <header className="mx-m md:mx-0 md:w-[680px]">
                <Heading variant={HeadingLevel.H2} className="text-primary-600">
                    Willkommen auf Mumble
                </Heading>
                <Heading variant={HeadingLevel.H4} className="text-slate-500">
                    Voluptatem qui cumque voluptatem quia tempora dolores distinctio vel repellat
                    dicta.
                </Heading>
            </header>
            {session && (
                <section className="flex w-full flex-col gap-y-m px-m md:w-auto md:px-0">
                    <NewPost session={session} />
                </section>
            )}
        </>
    );
}
