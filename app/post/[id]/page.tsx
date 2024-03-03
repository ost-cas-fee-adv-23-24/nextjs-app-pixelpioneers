import { getPost, getReplies } from '@/app/actions/post';
import { default as PostComponent } from '@/src/compositions/post/post';
import { PostVariant } from '@/src/compositions/post/types';
import ReplyContainer from '@/src/compositions/post/reply-container';

//export const dynamic = 'force-dynamic';
export default async function Post({ params }: { params: { id: string } }) {
    const post = await getPost(params.id);
    // TODO: paginate, stream, etc replies
    const replies = await getReplies(params.id);
    return (
        <PostComponent message={post} variant={PostVariant.DETAIL_VIEW}>
            <ReplyContainer paginatedReplies={replies} />
        </PostComponent>
    );
}
