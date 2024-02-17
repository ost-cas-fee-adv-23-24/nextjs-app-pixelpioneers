import React from 'react';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import LivePosts from '@/src/components/posts/list-post';
import NewPost from '@/src/components/posts/form-post';
import Post from '@/src/components/posts/post';
import { getPostList } from '@/src/services/post.service';
import DisplayName from '@/src/compositions/display-name/display-name';
import RecommendedUser from '@/src/compositions/recommended-user/recommended-user';
import Navigation from '@/src/components/navigation/navigation';

export default async function Home() {
    const session = await auth();
    const posts = await getPostList();
    return (
        <>
            <Navigation session={session} />
            <main className="p-24 flex min-h-screen flex-col items-center justify-between">
                {session && (
                    <>
                        <DisplayName />
                        <RecommendedUser />
                    </>
                )}
                {session && <NewPost session={session} />}
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
