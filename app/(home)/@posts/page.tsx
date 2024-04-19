import React from 'react';
import { getPosts, loadPaginatedMessages } from '@/app/actions/post';
import { PostVariant } from '@/src/compositions/post/types';
import MessageContainer from '@/src/compositions/post/message-container';
import ErrorPage from '@/src/compositions/error-page/error-page';
import InfiniteMessages from '@/src/compositions/post/infinite-messages';
import { PAGINATION_LIMIT } from '@/src/models/paginate.model';
import { Stream } from '@/src/components/stream/stream';
import { APP_ROUTES, getRoute, PostEvent } from '@/src/helpers/routes';

export default async function HomePostsPage() {
    const postsResponse = await getPosts({ limit: PAGINATION_LIMIT });
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
                <Stream eventType={PostEvent.CREATED} path={getRoute(APP_ROUTES.HOME)} />
                <MessageContainer messages={paginatedPosts.data} variant={PostVariant.TIMELINE} />
                {paginatedPosts.next && (
                    <InfiniteMessages
                        loadMessages={loadPaginatedMessages}
                        variant={PostVariant.TIMELINE}
                        nextRoute={paginatedPosts.next}
                    />
                )}
            </section>
        </>
    );
}
