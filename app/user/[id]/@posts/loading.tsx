import React from 'react';
import MessageMultiSkeleton from '@/src/compositions/message/message-multi-skeleton';

export default function LoadingUserPosts() {
    return <MessageMultiSkeleton classNames="h-[300px] w-full md:w-container" />;
}
