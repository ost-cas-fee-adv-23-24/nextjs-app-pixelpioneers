import { createPost } from '@/app/actions/post';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Avatar, AvatarSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import WritePost from '../write-post/write-post';
import { PostFormTypeVariant } from './types';
// import { getUser } from '@/app/actions/user';

export default async function NewPost() {
    const session = await auth();

    if (session?.accessToken && session.user?.id) {
        // TODO: Need to check why is not working
        // TODO: Already informed our Tutors in Teams - waiting for their response
        // const user = getUser('245809311459051537');
        // const user = getUser(session.user.id);
        const user = {
            id: '245809311459051537',
            username: 'andre',
            avatarUrl:
                'https://storage.googleapis.com/mumble-api-data/28e17313-a62b-411f-8128-f005b908a853',
            firstname: 'André',
            lastname: 'Ceres',
        };

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
    }

    // TODO: Error handling
    return <div>Please log in to write a post</div>;
}
