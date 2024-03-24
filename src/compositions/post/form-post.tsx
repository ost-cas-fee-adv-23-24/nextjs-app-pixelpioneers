import { Avatar, AvatarSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import WritePost from '../write-post/write-post';
import { ActionTypeVariant, PostFormTypeVariant } from './types';
import { getUser } from '@/app/actions/user';
import { User } from '@/src/models/user.model';
import { Session } from 'next-auth';

export default async function NewPost({ session }: { session: Session | null }) {
    if (session?.user?.profile?.sub) {
        const user: User = await getUser(session.user.profile.sub);

        // TODO: We need to have the label size of 32px - 2xl
        return (
            <section className="relative my-m flex flex-col gap-y-s rounded-m bg-white px-xl py-l md:min-h-[326px] md:w-[680px]">
                <div className="z-5 absolute left-[32px] top-[-20px] md:left-[-32px] md:top-[20px]">
                    {session && (
                        <Avatar
                            size={AvatarSize.M}
                            src={session.user?.image || ''}
                            alt={session.user?.name || ''}
                        />
                    )}
                </div>
                <WritePost
                    user={user}
                    variant={PostFormTypeVariant.MAINFIELD}
                    variantTypeAction={ActionTypeVariant.CREATE_POST}
                />
            </section>
        );
    }
    // TODO: Error handling
    return <div>Please log in to write a post</div>;
}
