'use client';
import { getPostWithReplies } from '@/app/actions/post';
import { default as PostComponent } from '@/src/components/post/post';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PostWithReplies } from '@/src/models/post.model';

export default function Post() {
    const params = useParams<{ id: string }>();
    const [post, setPost] = useState<PostWithReplies | undefined>();
    useEffect(() => {
        const fetchPost = async () => {
            //try {
            setPost(await getPostWithReplies(params.id));
            /*} catch (error) {
if (error instanceof ActionError) {
// TODO: error handling
}
}*/
        };
        fetchPost().catch(console.error);
    }, [
        params.id,
        /* TODO: check why revalidating happens unlcean with param in it*/
    ]);
    if (!post) {
        // TODO: error handling
        return <>ooopsie 404</>;
    }
    return (
        <PostComponent post={post}>
            {post?.replyList.map((reply) => {
                return <div key={reply.id}>{reply.text}</div>;
            })}
        </PostComponent>
    );
}
