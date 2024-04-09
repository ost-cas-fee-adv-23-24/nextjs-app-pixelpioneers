import PostMultiSkeleton from '@/src/compositions/post/post-multi-skeleton';
import React from 'react';

export default function LoadingPostReplies() {
    return <PostMultiSkeleton classNames="h-[300px] w-full md:w-[680px]" />;
}
