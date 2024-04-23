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
    const [posts, setPosts] = useState<Post[]>([]);
    const count = posts.length;
    useEffect(() => {
        const events = getPostEventSource();
        events.addEventListener(eventType, (event) => {
            const post = JSON.parse(event.data) as Post;
            // TODO: only set post, if creator is not logged in user
            setPosts([...posts, post]);
        });
        return () => events.close();
    }, [eventType, posts]);

    const hydratedReloadPathData = reloadPathData.bind(null, path);

    return count > 0 ? (
        <ActionBubble
            message={
                count === 1 ? `Neuer Post von ${posts[0].creator.username}` : `Neue Posts vorhanden`
            }
            onClick={async () => {
                await hydratedReloadPathData();
                scrollToTop();
                setPosts([]);
            }}
        />
    ) : (
        <></>
    );
}
