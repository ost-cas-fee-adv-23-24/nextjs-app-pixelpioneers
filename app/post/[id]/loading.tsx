import React from 'react';
import PostSkeleton from '@/src/compositions/post/post-skeleton';

export default async function LoadingPostReplies() {
    return <PostSkeleton classNames="h-[200px] w-full md:w-[680px]" />;
}
