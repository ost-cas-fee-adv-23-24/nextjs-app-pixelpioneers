'use client';
import { useEffect, useState } from 'react';
import { getPostEventSource, PostEvent } from '@/src/services/route.service';
import { ActionBubble } from '@/src/components/bubble/action-bubble';
import { Post } from '@/src/models/message.model';
import { reloadPathData } from '@/app/actions/caching';
import { scrollToTop } from '@/src/helpers/scroll-to-top';
import { useSession } from 'next-auth/react';

type PostStreamProps = {
    eventType: PostEvent;
    path: string;
};

export function PostStream({ eventType, path }: PostStreamProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const count = posts.length;

    const { data: session } = useSession();
    const userId = session?.user?.profile.sub;

    useEffect(() => {
        // start listening to Post Events
        const events = getPostEventSource();
        events.addEventListener(eventType, (event) => {
            const post = JSON.parse(event.data) as Post;
            if (post.creator.id !== userId) {
                setPosts([...posts, post]);
            }
        });
        return () => events.close();
    }, [eventType, posts, userId]);

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
