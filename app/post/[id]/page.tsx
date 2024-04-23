import { createReply, getPost, getReplies, loadPaginatedMessages } from '@/app/actions/post';
import Message from '@/src/compositions/message/message';
import { MessageDisplayVariant, MessageVariant } from '@/src/compositions/message/types';
import { getLoggedInUser } from '@/app/actions/utils';
import { notFound } from 'next/navigation';
import MessageFormLogin from '@/src/compositions/message-form-login/message-form-login';
import React from 'react';
import MessageContainer from '@/src/compositions/message/message-container';
import ErrorPage from '@/src/compositions/error-page/error-page';
import { PAGINATION_LIMIT } from '@/src/models/paginate.model';
import MessageLoader from '@/src/compositions/message/message-loader';

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
                    <MessageContainer
                        messages={repliesResponse.data.data}
                        displayVariant={MessageDisplayVariant.INLINE}
                    />
                    {repliesResponse.data.next && (
                        <MessageLoader
                            onLoad={loadPaginatedMessages}
                            displayVariant={MessageDisplayVariant.INLINE}
                            nextRoute={repliesResponse.data.next}
                        />
                    )}
                </div>
            )}
        </Message>
    );
}
