import { getPostWithReplies } from '@/app/actions/post';
import { default as PostComponent } from '@/src/compositions/post/post';

//export const dynamic = 'force-dynamic';
export default async function Post({ params }: { params: { id: string } }) {
    const post = await getPostWithReplies(params.id);
    return (
        <PostComponent post={post} detailView>
            {post?.replyList.map((reply) => {
                return <div key={reply.id}>reply: {reply.text}</div>;
            })}
        </PostComponent>
    );
}
