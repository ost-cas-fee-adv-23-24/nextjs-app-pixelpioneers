import { Message } from '@/src/models/post.model';
import { PostVariant } from '@/src/compositions/post/types';
import Post from './post';
import React from 'react';
import { Paragraph, ParagraphSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

type MessageContainerProps = {
    messages: Message[];
    variant: PostVariant;
    showNoContentInfo?: boolean;
};
export default function MessageContainer({
    messages,
    variant,
    showNoContentInfo = true,
}: MessageContainerProps) {
    const isPost = variant !== PostVariant.INLINE;

    if (showNoContentInfo && messages.length === 0) {
        return (
            <Paragraph size={ParagraphSize.M}>{`Keine ${
                isPost ? 'Posts' : 'Kommentare'
            } vorhanden`}</Paragraph>
        );
    }

    return messages.map((message, index) => {
        if (variant === PostVariant.INLINE) {
            return (
                <div key={message.id} className="flex flex-col gap-m md:gap-l">
                    {index > 0 && <hr className="mx-[-24px] text-secondary-100 md:mx-[-48px]" />}
                    <Post message={message} variant={PostVariant.INLINE} />
                </div>
            );
        }
        return <Post key={message.id} message={message} variant={variant} />;
    });
}
