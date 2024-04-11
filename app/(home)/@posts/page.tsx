import React from 'react';
import { getPosts } from '@/app/actions/post';
import { PostVariant } from '@/src/compositions/post/types';
import MessageContainer from '@/src/compositions/post/message-container';
import ErrorPage from '@/src/compositions/error-page/error-page';

export default async function HomePostsPage() {
    const postsResponse = await getPosts({ limit: 15 });
    if (postsResponse.isError) {
        return (
            <ErrorPage
                errorMessage={postsResponse.error.message}
                errorTitle={`Posts konnten nicht geladen werden.`}
                fullPage={false}
            />
        );
    }
    const paginatedPosts = postsResponse.data;
    return (
        <>
            <section className="flex flex-col gap-s md:mx-m">
                {/* TODO: <LivePosts />*/}
                <MessageContainer messages={paginatedPosts.data} variant={PostVariant.TIMELINE} />
            </section>
        </>
    );
}
