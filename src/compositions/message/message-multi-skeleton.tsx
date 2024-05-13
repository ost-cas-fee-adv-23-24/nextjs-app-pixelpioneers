import React from 'react';
import MessageSkeleton from '@/src/compositions/message/message-skeleton';
import { MessageDisplayVariant } from '@/src/compositions/message/types';

export default function MessageMultiSkeleton({
    displayVariant,
}: {
    displayVariant: MessageDisplayVariant;
}) {
    return (
        <div className="flex flex-col gap-s">
            <MessageSkeleton displayVariant={displayVariant} />
            <MessageSkeleton displayVariant={displayVariant} />
            <MessageSkeleton displayVariant={displayVariant} />
        </div>
    );
}
