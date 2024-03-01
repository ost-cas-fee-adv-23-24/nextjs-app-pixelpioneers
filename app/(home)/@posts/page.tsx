import React from 'react';
import Post from '@/src/compositions/post/post';
import { ActionError } from '@/src/models/error.model';
import { getPosts } from '@/app/actions/post';

export default async function Posts() {
    try {
        const paginatedPosts = await getPosts();
        return (
            <section className="mx-m flex flex-col gap-y-m">
                {/*<LivePosts />*/}
                {paginatedPosts.data.map((post) => (
                    <Post key={post.id} post={post} />
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
