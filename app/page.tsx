import React from 'react';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import LivePosts from '@/src/components/posts/list-post';
import NewPost from '@/src/components/posts/form-post';
import Post from '@/src/components/posts/post';
import { getPostList } from '@/src/services/post.service';
import Navigation from '@/src/components/navigation/navigation';
import { Heading, HeadingLevel } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

export default async function Home() {
    const session = await auth();
    const posts = await getPostList();
    return (
        <>
            <Navigation session={session} />
            <main className="p-24 flex min-h-screen flex-col items-center justify-between">
                <header className="mx-m md:mx-0 md:w-[680px]">
                    <Heading variant={HeadingLevel.H2} className="pt-m text-primary-600">
                        Willkommen auf Mumble
                    </Heading>
                    <Heading variant={HeadingLevel.H4} className="pb-m text-slate-500">
                        Voluptatem qui cumque voluptatem quia tempora dolores distinctio vel
                        repellat dicta.
                    </Heading>
                </header>
                {session && (
                    <section className="flex w-full flex-col gap-y-m px-m md:w-auto md:px-0">
                        <NewPost session={session} />
                    </section>
                )}
                <section className="flex flex-col gap-y-m">
                    <LivePosts />
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </section>
            </main>
        </>
    );
}
