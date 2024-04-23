import React from 'react';
import MessageSingleSkeleton from './message-single-skeleton';

export default function MessageMultiSkeleton({ classNames }: { classNames: string }) {
    return (
        <>
            <MessageSingleSkeleton className={classNames} />
            <MessageSingleSkeleton className={classNames} />
            <MessageSingleSkeleton className={classNames} />
        </>
    );
}
