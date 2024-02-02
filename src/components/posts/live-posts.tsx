'use client';

import { getPostEventSource, PostEvents } from '@/src/helpers/api';
import { Post as ApiPost } from '@/src/models/post.model';
import { useEffect, useState } from 'react';
import Post from './post';

export default function LivePosts() {
    const [posts, setPosts] = useState<ApiPost[]>([]);

    useEffect(() => {
        const events = getPostEventSource();
        events.addEventListener(PostEvents.created, (event: MessageEvent<string>) => {
            const post = JSON.parse(event.data) as ApiPost;
            setPosts([post, ...posts]);
        });
        return () => events.close();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <Post post={post} />
                </li>
            ))}
        </ul>
    );
}
