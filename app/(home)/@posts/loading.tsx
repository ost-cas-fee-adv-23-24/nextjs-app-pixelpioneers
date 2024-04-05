import React from 'react';
import PostSkeleton from '@/src/compositions/post/post-skeleton';

export default async function LoadingPost() {
    return <PostSkeleton classNames="h-[400px] w-[680px]" />;
}
