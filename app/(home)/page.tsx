import React from 'react';
import { Heading, HeadingLevel } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { MessageVariant } from '@/src/compositions/post/types';
import { createPost } from '@/app/actions/post';

import { getLoggedInUser } from '@/app/actions/utils';
import PostFormOrLogin from '@/src/compositions/post-form-or-login/post-form-or-login';

export default async function Home() {
    const user = await getLoggedInUser();
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
            <section className="flex w-full flex-col gap-y-m px-m md:w-auto md:px-0">
                <PostFormOrLogin
                    messageVariant={MessageVariant.POST}
                    onCreate={createPost}
                    user={user}
                />
            </section>
        </>
    );
}
