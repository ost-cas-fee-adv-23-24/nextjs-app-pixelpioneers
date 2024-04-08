import React from 'react';
import PostSingleSkeleton from './post-single-skeleton';

export default function PostMultiSkeleton({ classNames }: { classNames: string }) {
    return (
        <>
            <PostSingleSkeleton classNames={classNames} />
            <PostSingleSkeleton classNames={classNames} />
            <PostSingleSkeleton classNames={classNames} />
        </>
    );
}
