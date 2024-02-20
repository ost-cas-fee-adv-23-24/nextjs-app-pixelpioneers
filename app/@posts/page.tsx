import React from 'react';
import { getPosts } from '@/app/actions';
import Post from '@/src/components/posts/post';
import { ActionError } from '@/src/models/fetch.model';

export default async function Posts() {
    try {
        const paginatedPosts = await getPosts();
        return (
            <section className="flex flex-col gap-y-m">
                {/*<LivePosts />*/}
                {paginatedPosts.data.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </section>
        );
    } catch (error) {
        if (error instanceof ActionError) {
            return (
                <div>
                    {Object.entries(error.issues).map(([key, value]) => (
                        <div key={key}>
                            {key} {value}
                        </div>
                    ))}
                </div>
            );
        }
    }
}
