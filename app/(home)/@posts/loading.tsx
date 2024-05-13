import React from 'react';
import MessageMultiSkeleton from '@/src/compositions/message/message-multi-skeleton';
import { MessageDisplayVariant } from '@/src/compositions/message/types';

export default function LoadingPosts() {
    return <MessageMultiSkeleton displayVariant={MessageDisplayVariant.TIMELINE} />;
}
