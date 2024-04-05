import PostSkeleton from '@/src/compositions/post/post-skeleton';
import React from 'react';

export default async function LoadingPostReplies() {
    return <PostSkeleton classNames="h-[400px] w-full" />;
}
