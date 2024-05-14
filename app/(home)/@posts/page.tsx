import React from 'react';
import { getPosts } from '@/app/actions/message';
import { MessageDisplayVariant } from '@/src/compositions/message/types';
import ErrorPage from '@/src/compositions/error-page/error-page';
import { PAGINATION_LIMIT } from '@/src/models/paginate.model';
import { PostStream } from '@/src/components/post-stream/post-stream';
import { APP_ROUTES, getRoute, PostEvent } from '@/src/services/route.service';
import StatedMessageContainer from '@/src/compositions/message/stated-message-container';
import { getErrorMessage } from '@/src/models/action.model';

export default async function HomePostsPage() {
    const postsResponse = await getPosts({ limit: PAGINATION_LIMIT });
    if (postsResponse.isError) {
        return (
            <ErrorPage
                errorMessage={getErrorMessage(postsResponse.error)}
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
                <StatedMessageContainer
                    paginatedMessages={paginatedPosts}
                    displayVariant={MessageDisplayVariant.TIMELINE}
                />
            </section>
        </>
    );
}
