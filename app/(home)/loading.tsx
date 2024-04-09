import React from 'react';
import PostMultiSkeleton from '@/src/compositions/post/post-multi-skeleton';

export default function LoadingPost() {
    return <PostMultiSkeleton classNames="h-[400px] w-full md:w-[680px]" />;
}
