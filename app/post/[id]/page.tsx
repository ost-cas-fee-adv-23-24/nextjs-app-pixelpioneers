import { getPost } from '@/app/actions/post';
import { default as PostComponent } from '@/src/compositions/post/post';
import { PostVariant } from '@/src/compositions/post/types';

//export const dynamic = 'force-dynamic';
export default async function Post({ params }: { params: { id: string } }) {
    const post = await getPost(params.id);
    return (
        <PostComponent post={post} variant={PostVariant.DETAIL_VIEW}>
            {/*post?.replyList.map((reply) => {
                return <div key={reply.id}>reply: {reply.text}</div>;
            })*/}
        </PostComponent>
    );
}
