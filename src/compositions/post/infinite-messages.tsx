'use client';
import React, { useState } from 'react';
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
    loadMessages: (formData: FormData) => Promise<string>;
    variant: PostVariant;
    nextRoute: string;
};

export default function InfiniteMessages({
    loadMessages,
    variant,
    nextRoute,
}: InfiniteMessagesProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [next, setNext] = useState<string | undefined>(nextRoute);
    const isPost = variant !== PostVariant.INLINE;
    // TODO: fancy loading skeletons?
    return (
        <>
            <MessageContainer messages={messages} variant={variant} showNoContentInfo={false} />
            {next && (
                <form
                    className="flex flex-row justify-center"
                    action={async (formData) => {
                        const messageResponse = JSON.parse(
                            await loadMessages(formData),
                        ) as ActionResponse<PaginatedResult<Message>>;
                        if (!messageResponse.isError) {
                            const paginatedMessages = messageResponse.data;
                            setMessages((prevState) => [...prevState, ...paginatedMessages.data]);
                            setNext(paginatedMessages.next);
                        } else {
                            console.error(messageResponse.error);
                        }
                    }}
                >
                    <input name="next" value={next} hidden readOnly />
                    <Button
                        className="mt-s"
                        Icon={IconRepost}
                        size={ButtonSize.L}
                        variant={Variant.TERTIARY}
                        label={`Weitere ${isPost ? 'Posts' : 'Kommentare'} laden`}
                        type="submit"
                    />
                </form>
            )}
        </>
    );
}
