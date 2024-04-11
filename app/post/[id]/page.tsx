import { createReply, getPost, getReplies } from '@/app/actions/post';
import { default as PostComponent } from '@/src/compositions/post/post';
import { MessageVariant, PostVariant } from '@/src/compositions/post/types';
import { getLoggedInUser } from '@/app/actions/utils';
import { notFound } from 'next/navigation';
import PostFormOrLogin from '@/src/compositions/post-form-or-login/post-form-or-login';
import { Paragraph, ParagraphSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import React from 'react';
import MessageContainer from '@/src/compositions/post/message-container';
//export const dynamic = 'force-dynamic';
export default async function PostPage({ params }: { params: { id: string } }) {
    const user = await getLoggedInUser();
    const postResponse = await getPost(params.id);
    if (postResponse.isError) {
        notFound();
    }
    const post = postResponse.data;
    const hydratedCreateReply = createReply.bind(null, post.id);

    // TODO: paginate, stream, etc replies
    // TODO: separate replies?
    const repliesResponse = await getReplies(post.id);
    if (repliesResponse.isError) {
        return (
            <PostComponent message={post} variant={PostVariant.DETAIL_VIEW}>
                <PostFormOrLogin
                    messageVariant={MessageVariant.REPLY}
                    onCreate={hydratedCreateReply}
                    user={user}
                />
                <Paragraph size={ParagraphSize.L}>
                    Kommentare konnten nicht geladen werden
                </Paragraph>
                <Paragraph size={ParagraphSize.M}>{repliesResponse.error.message}</Paragraph>
            </PostComponent>
        );
    }
    const paginatedReplies = repliesResponse.data;
    return (
        <PostComponent message={post} variant={PostVariant.DETAIL_VIEW}>
            <PostFormOrLogin
                messageVariant={MessageVariant.REPLY}
                onCreate={hydratedCreateReply}
                user={user}
            />
            {paginatedReplies.data.length > 0 && (
                <div className="mt-s flex flex-col gap-m md:mt-l md:gap-l">
                    <MessageContainer
                        messages={paginatedReplies.data}
                        variant={PostVariant.INLINE}
                    />
                </div>
            )}
        </PostComponent>
    );
}
