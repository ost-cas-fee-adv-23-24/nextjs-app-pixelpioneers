'use client';

import { Message } from '@/src/models/message.model';
import { MessageActionType, MessageDisplayVariant } from '@/src/compositions/message/types';
import React, { useEffect, useReducer } from 'react';
import { PaginatedResult } from '@/src/models/paginate.model';
import MessageContainer from '@/src/compositions/message/message-container';
import { messageReducer } from '@/src/compositions/message/message-reducer';
import { loadPaginatedMessages } from '@/app/actions/message';
import { ActionResponse, getErrorMessage } from '@/src/models/action.model';
import ErrorPage from '@/src/compositions/error-page/error-page';

type StatedMessageContainerProps = {
    paginatedMessages: PaginatedResult<Message>;
    displayVariant: MessageDisplayVariant;
};
export default function StatedMessageContainer({
    paginatedMessages,
    displayVariant,
}: StatedMessageContainerProps) {
    const [state, dispatch] = useReducer(messageReducer, {
        messages: paginatedMessages.data,
        nextUrl: paginatedMessages.next,
    });
    const isPost = displayVariant !== MessageDisplayVariant.INLINE;

    useEffect(() => {
        // reload when new messages from revalidating tags/paths load
        dispatch({
            type: MessageActionType.MESSAGES_REVALIDATED,
            messages: paginatedMessages.data,
            nextUrl: paginatedMessages.next,
        });
    }, [paginatedMessages]);

    return state.error ? (
        <ErrorPage
            errorMessage={getErrorMessage(state.error)}
            errorTitle={`${isPost ? 'Posts' : 'Kommentare'} konnten nicht geladen werden.`}
            fullPage={false}
        />
    ) : (
        <MessageContainer
            messages={state.messages}
            nextUrl={state.nextUrl}
            displayVariant={displayVariant}
            onLoad={async (formData) => {
                const messageResponse = JSON.parse(
                    await loadPaginatedMessages(formData),
                ) as ActionResponse<PaginatedResult<Message>>;

                if (messageResponse.isError) {
                    dispatch({
                        type: MessageActionType.MESSAGES_ERROR,
                        error: messageResponse.error,
                    });
                } else {
                    const paginatedMessages = messageResponse.data;
                    dispatch({
                        type: MessageActionType.MESSAGES_RELOADED,
                        messages: paginatedMessages.data,
                        nextUrl: paginatedMessages.next,
                    });
                }
            }}
        />
    );
}
