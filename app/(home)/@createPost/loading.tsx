import React from 'react';
import MessageSingleSkeleton from '@/src/compositions/message/message-single-skeleton';

export default function LoadingForm() {
    return <MessageSingleSkeleton className="h-[400px] w-full md:ml-[-40px] md:w-[720px]" />;
}
