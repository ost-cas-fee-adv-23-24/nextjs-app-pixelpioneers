import React from 'react';
import Post from '@/src/compositions/post/post';
import { ActionError } from '@/src/models/error.model';
import { getPosts } from '@/app/actions/post';
import { PostVariant } from '@/src/compositions/post/types';

export default async function Posts() {
    try {
        const paginatedPosts = await getPosts();
        return (
            <section className="mx-m flex w-full flex-col gap-s px-m md:w-[680px] md:px-0">
                {/*<LivePosts />*/}
                {paginatedPosts.data.map((post) => (
                    <Post key={post.id} message={post} variant={PostVariant.TIMELINE} />
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
