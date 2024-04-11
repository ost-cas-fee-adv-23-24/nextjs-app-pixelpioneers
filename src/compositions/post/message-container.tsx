import { Message } from '@/src/models/post.model';
import { PostVariant } from '@/src/compositions/post/types';
import Post from './post';
import React from 'react';

type MessageContainerProps = {
    messages: Message[];
    variant: PostVariant;
};
export default function MessageContainer({ messages, variant }: MessageContainerProps) {
    return messages.map((message, index) => {
        // TODO: handle empty array
        if (variant === PostVariant.INLINE) {
            return (
                <div key={message.id} className="flex flex-col gap-m md:gap-l">
                    {index > 0 && <hr className="mx-[-24px] text-secondary-100 md:mx-[-48px]" />}
                    <Post message={message} variant={PostVariant.INLINE} />
                </div>
            );
        } else {
            return <Post key={message.id} message={message} variant={variant} />;
        }
    });
}
