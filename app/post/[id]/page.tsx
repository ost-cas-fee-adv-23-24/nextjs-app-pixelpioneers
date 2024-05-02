import { createReply, getPost, getReplies } from '@/app/actions/message';
import Message from '@/src/compositions/message/message';
import { MessageDisplayVariant, MessageVariant } from '@/src/compositions/message/types';
import { getLoggedInUser } from '@/app/actions/utils';
import { notFound } from 'next/navigation';
import MessageFormLogin from '@/src/compositions/message/message-form-login';
import React from 'react';
import ErrorPage from '@/src/compositions/error-page/error-page';
import { PAGINATION_LIMIT } from '@/src/models/paginate.model';
import StatedMessageContainer from '@/src/compositions/message/stated-message-container';

export default async function PostPage({ params }: { params: { id: string } }) {
    const user = await getLoggedInUser();
    const postResponse = await getPost(params.id);
    if (postResponse.isError) {
        notFound();
    }
    const post = postResponse.data;
    const hydratedCreateReply = createReply.bind(null, post.id);

    // TODO: separate replies?
    const repliesResponse = await getReplies(post.id, { limit: PAGINATION_LIMIT });
    return (
        <Message message={post} displayVariant={MessageDisplayVariant.DETAIL_VIEW}>
            <MessageFormLogin
                messageVariant={MessageVariant.REPLY}
                onCreate={hydratedCreateReply}
                user={user}
            />
            {repliesResponse.isError ? (
                <ErrorPage
                    errorMessage={repliesResponse.error.message}
                    errorTitle={`Kommentare konnten nicht geladen werden.`}
                    fullPage={false}
                />
            ) : (
                <div className="mt-s flex flex-col gap-m md:mt-l md:gap-l">
                    <StatedMessageContainer
                        paginatedMessages={repliesResponse.data}
                        displayVariant={MessageDisplayVariant.INLINE}
                    />
                </div>
            )}
        </Message>
    );
}
