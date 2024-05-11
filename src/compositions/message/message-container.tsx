'use client';
import { Message } from '@/src/models/message.model';
import { MessageDisplayVariant } from '@/src/compositions/message/types';
import { default as MessageComponent } from './message';
import React from 'react';
import {
    Button,
    ButtonSize,
    IconRepost,
    Paragraph,
    ParagraphSize,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { loadPaginatedMessages } from '@/app/actions/message';
import { ActionResponse } from '@/src/models/action.model';
import { PaginatedResult } from '@/src/models/paginate.model';

type MessageContainerProps = {
    messages: Message[];
    displayVariant: MessageDisplayVariant;
    onLoad: (paginatedMessages: PaginatedResult<Message>) => void;
    nextUrl?: string;
};
export default function MessageContainer({
    messages,
    displayVariant,
    onLoad,
    nextUrl,
}: MessageContainerProps) {
    const isPost = displayVariant !== MessageDisplayVariant.INLINE;

    if (messages.length === 0) {
        return (
            <Paragraph className="self-center text-secondary-400" size={ParagraphSize.M}>{`Keine ${
                isPost ? 'Posts' : 'Kommentare'
            } vorhanden`}</Paragraph>
        );
    }

    return (
        <>
            {messages.map((message, index) => {
                if (displayVariant === MessageDisplayVariant.INLINE) {
                    return (
                        <div key={message.id} className="flex flex-col gap-m md:gap-l">
                            {index > 0 && (
                                <hr className="mx-[-24px] text-secondary-100 md:mx-[-48px]" />
                            )}
                            <MessageComponent
                                message={message}
                                displayVariant={displayVariant}
                                priorityImageLoad={index < 5}
                            />
                        </div>
                    );
                }
                return (
                    <MessageComponent
                        key={message.id}
                        message={message}
                        displayVariant={displayVariant}
                        priorityImageLoad={index < 5}
                    />
                );
            })}
            {nextUrl && (
                <form
                    className="flex flex-row justify-center"
                    action={async (formData) => {
                        const messageResponse = JSON.parse(
                            await loadPaginatedMessages(formData),
                        ) as ActionResponse<PaginatedResult<Message>>;
                        if (!messageResponse.isError) {
                            onLoad(messageResponse.data);
                        } else {
                            // TODO: show error state
                            console.error(messageResponse.error);
                        }
                    }}
                >
                    <input name="next" value={nextUrl} hidden readOnly />
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
