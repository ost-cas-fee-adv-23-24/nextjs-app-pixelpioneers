import { createReply, getPost, getReplies } from '@/app/actions/post';
import { default as PostComponent } from '@/src/compositions/post/post';
import { MessageVariant, PostVariant } from '@/src/compositions/post/types';
import ReplyContainer from '@/src/compositions/post/reply-container';
import PostForm from '@/src/compositions/post/post-form';
import { getUser } from '@/app/actions/user';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

//export const dynamic = 'force-dynamic';
export default async function Post({ params }: { params: { id: string } }) {
    const session = await auth();
    const userId = session?.user?.profile.sub;
    // TODO: Error handling
    const user = userId ? await getUser(userId) : undefined;
    const post = await getPost(params.id);
    // TODO: paginate, stream, etc replies
    const replies = await getReplies(post.id);
    // TODO: error handling
    const hydratedCreateReply = createReply.bind(null, post.id);
    return (
        <PostComponent message={post} variant={PostVariant.DETAIL_VIEW}>
            {user && (
                <PostForm
                    user={user}
                    messageVariant={MessageVariant.REPLY}
                    onCreate={hydratedCreateReply}
                />
            )}
            <ReplyContainer paginatedReplies={replies} />
        </PostComponent>
    );
}
