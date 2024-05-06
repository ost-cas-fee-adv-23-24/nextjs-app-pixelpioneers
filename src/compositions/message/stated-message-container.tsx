'use client';

import { Message } from '@/src/models/message.model';
import { MessageDisplayVariant } from '@/src/compositions/message/types';
import React, { useEffect, useState } from 'react';
import { PaginatedResult } from '@/src/models/paginate.model';
import MessageContainer from '@/src/compositions/message/message-container';

type StatedMessageContainerProps = {
    paginatedMessages: PaginatedResult<Message>;
    displayVariant: MessageDisplayVariant;
};
export default function StatedMessageContainer({
    paginatedMessages,
    displayVariant,
}: StatedMessageContainerProps) {
    const [messages, setMessages] = useState<Message[]>(paginatedMessages.data);
    const [nextUrl, setNextUrl] = useState<string | undefined>(paginatedMessages.next);

    useEffect(() => {
        // reload when new messages from revalidating tags/paths load
        setMessages(paginatedMessages.data);
        setNextUrl(paginatedMessages.next);
    }, [paginatedMessages]);

    return (
        <MessageContainer
            messages={messages}
            displayVariant={displayVariant}
            onLoad={(paginatedMessages) => {
                setMessages((prevState) => [...prevState, ...paginatedMessages.data]);
                setNextUrl(paginatedMessages.next);
            }}
            nextUrl={nextUrl}
        />
    );
}
