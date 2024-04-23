import React from 'react';
import MessageMultiSkeleton from '@/src/compositions/message/message-multi-skeleton';

export default function LoadingPosts() {
    return <MessageMultiSkeleton classNames="h-[400px] w-full md:w-[720px] md:ml-[-40px]" />;
}
