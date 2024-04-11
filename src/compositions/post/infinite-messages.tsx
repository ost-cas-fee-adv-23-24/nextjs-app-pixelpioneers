'use client';
import React, { Suspense } from 'react';
import PostMultiSkeleton from '@/src/compositions/post/post-multi-skeleton';

export default function InfiniteMessages(/*{ lastMessageId }: { lastMessageId: string }*/) {
    //const [messages, setMessages] = useState<Message[]>([]);

    return (
        <Suspense
            fallback={
                <PostMultiSkeleton classNames="h-[400px] w-full md:w-[720px] md:ml-[-40px]" />
            }
        >
            {/*messages.map((message) => (
                <Post key={message.id} message={message} variant={PostVariant.TIMELINE} />
            ))*/}
        </Suspense>
    );
}
