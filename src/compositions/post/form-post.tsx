import { createPost } from '@/app/actions/post';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Avatar, AvatarSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import WritePost from '../write-post/write-post';
import { PostFormTypeVariant } from './types';
import { getUser } from '@/app/actions/user';
import { User } from '@/src/models/user.model';

export default async function NewPost() {
    const session = await auth();

    if (session?.user?.profile?.sub) {
        const user: User = await getUser(session.user.profile.sub);

        // TODO: We need to have the label size of 32px - 2xl
        return (
            <form
                className="relative my-m flex flex-col gap-y-s rounded-m bg-white px-xl py-l md:min-h-[326px] md:w-[680px]"
                action={createPost}
            >
                <div className="z-5 absolute left-[32px] top-[-20px] md:left-[-32px] md:top-[20px]">
                    <Avatar
                        size={AvatarSize.M}
                        src={session?.user?.image || ''}
                        alt={session?.user?.name || ''}
                    />
                </div>
                <WritePost user={user} variant={PostFormTypeVariant.MAINFIELD} />
            </form>
        );
        // TODO: Error handling
        return <div>Please log in to write a post</div>;
    }
}
