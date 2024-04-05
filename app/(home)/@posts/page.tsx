import React, { Suspense } from 'react';
import Post from '@/src/compositions/post/post';
import { ActionError } from '@/src/models/error.model';
import { getPosts } from '@/app/actions/post';
import { PostVariant } from '@/src/compositions/post/types';
import LoadingPost from './loading';

export default async function Posts() {
    try {
        const paginatedPosts = await getPosts();
        return (
            <section className="mx-m flex flex-col gap-s">
                {/*<LivePosts />*/}
                {paginatedPosts.data.map((post) => (
                    <Suspense key={post.id} fallback={<LoadingPost />}>
                        <Post key={post.id} message={post} variant={PostVariant.TIMELINE} />
                    </Suspense>
                ))}
            </section>
        );
    } catch (error) {
        if (error instanceof ActionError) {
            return (
                <>
                    <p>{error.subject}</p>
                    <p>{error.issue}</p>
                </>
            );
        }
    }
}
