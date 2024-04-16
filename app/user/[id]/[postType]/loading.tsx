import PostMultiSkeleton from '@/src/compositions/post/post-multi-skeleton';
import ProfileHeaderSkeleton from '@/src/compositions/profile-header/profile-header-skeleton';
import React from 'react';

export default function Loading() {
    return (
        <>
            <ProfileHeaderSkeleton classNames="h-[400px] w-full" />
            <PostMultiSkeleton classNames="h-[300px] w-full md:w-[680px]" />
        </>
    );
}
