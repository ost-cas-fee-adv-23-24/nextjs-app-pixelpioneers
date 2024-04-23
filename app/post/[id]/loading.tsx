import MessageMultiSkeleton from '@/src/compositions/message/message-multi-skeleton';
import React from 'react';

export default function LoadingPostReplies() {
    return <MessageMultiSkeleton classNames="h-[300px] w-full md:w-[680px]" />;
}
