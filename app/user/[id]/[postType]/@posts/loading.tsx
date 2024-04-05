import React from 'react';
import PostSkeleton from '@/src/compositions/post/post-skeleton';

export default function LoadingPost() {
    return <PostSkeleton classNames="h-[400px] w-full" />;
}
