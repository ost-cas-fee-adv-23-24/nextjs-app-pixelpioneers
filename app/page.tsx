import React from 'react';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import NewPost from '@/src/components/posts/form-post';
import Post from '@/src/components/posts/post';
import DisplayName from '@/src/compositions/display-name/display-name';
import RecommendedUser from '@/src/compositions/recommended-user/recommended-user';
import Navigation from '@/src/components/navigation/navigation';
import { getPosts } from '@/app/actions';

export default async function Home() {
    const session = await auth();
    const paginatedPosts = await getPosts();
    return (
        <>
            <Navigation session={session} />
            <main className="p-24 flex min-h-screen flex-col items-center justify-between">
                {session && (
                    <>
                        <p>User: {session.user?.name}</p>
                        <DisplayName />
                        <RecommendedUser />
                    </>
                )}
                {session && <NewPost />}
                <section className="flex flex-col gap-y-m">
                    {/*<LivePosts />*/}
                    {paginatedPosts.data.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </section>
            </main>
        </>
    );
}
