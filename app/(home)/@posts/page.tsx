import React from 'react';
import Post from '@/src/compositions/post/post';
import { getPosts } from '@/app/actions/post';
import { PostVariant } from '@/src/compositions/post/types';
import ErrorPage from '@/src/compositions/error-page/error-page';

export default async function Posts() {
    const postsResponse = await getPosts();
    if (postsResponse.isError) {
        return (
            <ErrorPage
                errorMessage={postsResponse.error.message}
                errorTitle="Posts konnten nicht geladen werden."
                fullPage={false}
            />
        );
    }
    const paginatedPosts = postsResponse.data;
    return (
        <section className="flex flex-col gap-s md:mx-m">
            {/* TODO: <LivePosts />*/}
            {paginatedPosts.data.map((post) => (
                <Post key={post.id} message={post} variant={PostVariant.TIMELINE} />
            ))}
        </section>
    );
}
