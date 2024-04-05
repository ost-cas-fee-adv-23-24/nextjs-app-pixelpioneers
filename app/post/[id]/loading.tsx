import React from 'react';
import PostSkeleton from '@/src/compositions/post/post-skeleton';

export default function LoadingPostReplies() {
    return <PostSkeleton classNames="h-[200px] md:w-[680px]" />;
}
