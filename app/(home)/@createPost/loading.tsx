import React from 'react';
import MessageSkeleton from '@/src/compositions/message/message-skeleton';
import { MessageDisplayVariant } from '@/src/compositions/message/types';

export default function LoadingForm() {
    return <MessageSkeleton displayVariant={MessageDisplayVariant.TIMELINE} />;
}
