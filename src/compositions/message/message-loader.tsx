'use client';
import React, { useState } from 'react';
import { MessageDisplayVariant } from '@/src/compositions/message/types';
import { Message } from '@/src/models/message.model';
import {
    Button,
    ButtonSize,
    IconRepost,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { PaginatedResult } from '@/src/models/paginate.model';
import { ActionResponse } from '@/src/models/action.model';
import MessageContainer from '@/src/compositions/message/message-container';

type MessageLoaderProps = {
    onLoad: (formData: FormData) => Promise<string>;
    displayVariant: MessageDisplayVariant;
    nextRoute: string;
};

export default function MessageLoader({ onLoad, displayVariant, nextRoute }: MessageLoaderProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [next, setNext] = useState<string | undefined>(nextRoute);
    const isPost = displayVariant !== MessageDisplayVariant.INLINE;
    // TODO: fancy loading skeletons?
    return (
        <>
            <MessageContainer
                messages={messages}
                displayVariant={displayVariant}
                showNoContentInfo={false}
                reload
            />
            {next && (
                <form
                    className="flex flex-row justify-center"
                    action={async (formData) => {
                        const messageResponse = JSON.parse(
                            await onLoad(formData),
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
