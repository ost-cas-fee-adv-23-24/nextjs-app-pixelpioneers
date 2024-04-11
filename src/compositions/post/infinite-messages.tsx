'use client';
import React, { Suspense, useState } from 'react';
import PostMultiSkeleton from '@/src/compositions/post/post-multi-skeleton';
import { PostVariant } from '@/src/compositions/post/types';
import { Message } from '@/src/models/post.model';
import {
    Button,
    ButtonSize,
    IconRepost,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { PaginatedResult } from '@/src/models/paginate.model';
import { ActionResponse } from '@/src/models/action.model';
import MessageContainer from '@/src/compositions/post/message-container';

type InfiniteMessagesProps = {
    loadMessages: () => ActionResponse<PaginatedResult<Message>>;
    variant: PostVariant;
};

export default function InfiniteMessages({ loadMessages, variant }: InfiniteMessagesProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const isPost = variant === PostVariant.INLINE;
    return (
        <>
            <Suspense
                fallback={
                    <PostMultiSkeleton classNames="h-[400px] w-full md:w-[720px] md:ml-[-40px]" />
                }
            >
                <MessageContainer messages={messages} variant={variant} showNoContentInfo={false} />
            </Suspense>
            <form
                action={async () => {
                    const messageResponse = loadMessages();
                    if (!messageResponse.isError) {
                        const paginatedMessages = messageResponse.data;
                        setMessages((prevState) => [...prevState, ...paginatedMessages.data]);
                    }
                }}
            >
                <Button
                    Icon={IconRepost}
                    size={ButtonSize.L}
                    variant={Variant.TERTIARY}
                    label={`Weitere ${isPost ? 'Posts' : 'Kommentare'} laden`}
                    type="submit"
                />
            </form>
        </>
    );
}
