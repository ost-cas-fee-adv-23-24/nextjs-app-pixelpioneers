import MessageMultiSkeleton from '@/src/compositions/message/message-multi-skeleton';
import React from 'react';
import { MessageDisplayVariant } from '@/src/compositions/message/types';
import MessageSkeleton from '@/src/compositions/message/message-skeleton';

export default function LoadingPost() {
    return (
        <MessageSkeleton displayVariant={MessageDisplayVariant.DETAIL_VIEW}>
            <MessageMultiSkeleton displayVariant={MessageDisplayVariant.INLINE} />
        </MessageSkeleton>
    );
}
