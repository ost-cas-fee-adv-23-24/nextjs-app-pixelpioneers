import React from 'react';
import MessageMultiSkeleton from '@/src/compositions/message/message-multi-skeleton';

export default function LoadingHome() {
    return (
        <MessageMultiSkeleton classNames="h-[400px] min-w-[350px] w-full md:w-[720px] md:ml-[-40px]" />
    );
}
