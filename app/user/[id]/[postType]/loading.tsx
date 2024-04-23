import MessageMultiSkeleton from '@/src/compositions/message/message-multi-skeleton';
import ProfileHeaderSkeleton from '@/src/compositions/profile-header/profile-header-skeleton';
import React from 'react';

export default function Loading() {
    return (
        <>
            <ProfileHeaderSkeleton className="h-[400px] w-full" />
            <MessageMultiSkeleton classNames="h-[300px] w-full md:w-[680px]" />
        </>
    );
}
