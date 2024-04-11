import React from 'react';
import PostSingleSkeleton from '@/src/compositions/post/post-single-skeleton';

export default function LoadingForm() {
    return <PostSingleSkeleton classNames="h-[400px] w-full md:w-[720px] md:ml-[-40px]" />;
}
