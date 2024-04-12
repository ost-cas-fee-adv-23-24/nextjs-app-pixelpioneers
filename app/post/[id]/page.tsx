import { createReply, getPost, getReplies } from '@/app/actions/post';
import { default as PostComponent } from '@/src/compositions/post/post';
import { MessageVariant, PostVariant } from '@/src/compositions/post/types';
import { getLoggedInUser } from '@/app/actions/utils';
import { notFound } from 'next/navigation';
import PostFormOrLogin from '@/src/compositions/post-form-or-login/post-form-or-login';
import React from 'react';
import MessageContainer from '@/src/compositions/post/message-container';
import ErrorPage from '@/src/compositions/error-page/error-page';
import { PAGINATION_LIMIT } from '@/src/models/paginate.model';

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
        <PostComponent message={post} variant={PostVariant.DETAIL_VIEW}>
            <PostFormOrLogin
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
                        variant={PostVariant.INLINE}
                    />
                </div>
            )}
        </PostComponent>
    );
}
