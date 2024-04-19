'use client';
import { useEffect, useState } from 'react';
import { getPostEventSource, PostEvent } from '@/src/helpers/routes';
import { ActionBubble } from '@/src/components/info-bubble/action-bubble';
import { Post } from '@/src/models/post.model';
import { reloadPathData } from '@/app/actions/caching';
import { scrollToTop } from '@/src/helpers/scrollToTop';

type StreamProps = {
    eventType: PostEvent;
    path: string;
};

export function PostStream({ eventType, path }: StreamProps) {
    const [post, setPost] = useState<Post>();
    useEffect(() => {
        const events = getPostEventSource();
        events.addEventListener(eventType, (event) => {
            const post = JSON.parse(event.data) as Post;
            // TODO: only set post, if creator not logged in user
            setPost(post);
        });
        return () => events.close();
    }, [eventType]);

    const hydratedReloadPathData = reloadPathData.bind(null, path);

    return post ? (
        <ActionBubble
            message={`Neuer Post von ${post.creator.username}`}
            onClick={async () => {
                await hydratedReloadPathData();
                scrollToTop();
                setPost(undefined);
            }}
        />
    ) : (
        <></>
    );
}
