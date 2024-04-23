import { Message } from '@/src/models/message.model';
import { MessageDisplayVariant } from '@/src/compositions/message/types';
import { default as MessageComponent } from './message';
import React from 'react';
import { Paragraph, ParagraphSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

type MessageContainerProps = {
    messages: Message[];
    displayVariant: MessageDisplayVariant;
    showNoContentInfo?: boolean;
    reload?: boolean;
};
export default function MessageContainer({
    messages,
    displayVariant,
    showNoContentInfo = true,
    reload = false,
}: MessageContainerProps) {
    const isPost = displayVariant !== MessageDisplayVariant.INLINE;

    if (showNoContentInfo && messages.length === 0) {
        return (
            <Paragraph className="self-center text-secondary-400" size={ParagraphSize.M}>{`Keine ${
                isPost ? 'Posts' : 'Kommentare'
            } vorhanden`}</Paragraph>
        );
    }

    return messages.map((message, index) => {
        if (displayVariant === MessageDisplayVariant.INLINE) {
            return (
                <div key={message.id} className="flex flex-col gap-m md:gap-l">
                    {(reload || index > 0) && (
                        <hr className="mx-[-24px] text-secondary-100 md:mx-[-48px]" />
                    )}
                    <MessageComponent
                        message={message}
                        displayVariant={MessageDisplayVariant.INLINE}
                    />
                </div>
            );
        }
        return (
            <MessageComponent key={message.id} message={message} displayVariant={displayVariant} />
        );
    });
}
