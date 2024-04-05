import React from 'react';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import PostForm from '@/src/compositions/post/post-form';
import { Heading, HeadingLevel } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { getUser } from '../actions/user';
import { MessageVariant } from '@/src/compositions/post/types';
import { createPost } from '@/app/actions/post';

export default async function Home() {
    const session = await auth();
    const userId = session?.user?.profile.sub;
    // TODO: Error handling
    const user = userId ? await getUser(userId) : undefined;
    return (
        <>
            <header className="px-m md:w-[680px]">
                <Heading variant={HeadingLevel.H2} className="text-primary-600">
                    Willkommen auf Mumble
                </Heading>
                <Heading variant={HeadingLevel.H4} className="text-slate-500">
                    Voluptatem qui cumque voluptatem quia tempora dolores distinctio vel repellat
                    dicta.
                </Heading>
            </header>
            {user && (
                <section className="flex w-full flex-col gap-y-m px-m md:w-[680px] md:px-0">
                    <PostForm
                        user={user}
                        messageVariant={MessageVariant.POST}
                        onCreate={createPost}
                    />
                </section>
            )}
        </>
    );
}
