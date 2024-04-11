import React from 'react';
import PostMultiSkeleton from '@/src/compositions/post/post-multi-skeleton';

export default function LoadingPosts() {
    return (
        <PostMultiSkeleton classNames="h-[400px] min-w-[350px] w-full md:w-[720px] md:ml-[-40px]" />
    );
}
