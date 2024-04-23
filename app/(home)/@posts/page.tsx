import React from 'react';
import { getPosts } from '@/app/actions/post';
import { MessageDisplayVariant } from '@/src/compositions/message/types';
import MessageContainer from '@/src/compositions/message/message-container';
import ErrorPage from '@/src/compositions/error-page/error-page';
import MessageLoader from '@/src/compositions/message/message-loader';
import { PAGINATION_LIMIT } from '@/src/models/paginate.model';
import { PostStream } from '@/src/components/post-stream/post-stream';
import { APP_ROUTES, getRoute, PostEvent } from '@/src/helpers/routes';

export default async function HomePostsPage() {
    const postsResponse = await getPosts({ limit: PAGINATION_LIMIT });
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
        <>
            <section className="flex flex-col gap-s md:mx-m">
                <PostStream eventType={PostEvent.CREATED} path={getRoute(APP_ROUTES.HOME)} />
                <MessageContainer
                    messages={paginatedPosts.data}
                    displayVariant={MessageDisplayVariant.TIMELINE}
                />
                {paginatedPosts.next && (
                    <MessageLoader
                        displayVariant={MessageDisplayVariant.TIMELINE}
                        nextRoute={paginatedPosts.next}
                    />
                )}
            </section>
        </>
    );
}
