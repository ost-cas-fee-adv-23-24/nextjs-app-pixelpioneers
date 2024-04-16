'use client';
import { useEffect, useState } from 'react';
import { getPostEventSource, PostEvent } from '@/src/helpers/routes';
import { InfoBubble } from '@/src/components/info-bubble/info-bubble';
import { Post } from '@/src/models/post.model';

type StreamProps = {
    eventType: PostEvent;
};

export function Stream({ eventType }: StreamProps) {
    const [post, setPost] = useState<Post>();
    useEffect(() => {
        const events = getPostEventSource();
        events.addEventListener(eventType, (event) => {
            const post = JSON.parse(event.data) as Post;
            setPost(post);
            // or revalidate tags
        });
        return () => events.close();
    }, [eventType]);
    return post ? (
        <InfoBubble
            message={`Neuer Post von ${post.creator.username}`}
            onClick={() => {
                /* do stuff here */
            }}
        />
    ) : (
        <></>
    );
}
