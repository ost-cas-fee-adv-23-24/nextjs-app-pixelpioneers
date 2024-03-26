import { Avatar, AvatarSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import WritePost from '../write-post/write-post';
import { MessageVariant, PostFormTypeVariant } from './types';
import { User } from '@/src/models/user.model';

export default async function PostForm({ user }: { user: User }) {
    return (
        <section className="relative my-m flex flex-col gap-y-s rounded-m bg-white px-xl py-l md:min-h-[326px] md:w-[680px]">
            <div className="z-5 absolute left-[32px] top-[-20px] md:left-[-32px] md:top-[20px]">
                <Avatar size={AvatarSize.M} src={user.avatarUrl || ''} alt={user.username} />
            </div>
            <WritePost
                user={user}
                variant={PostFormTypeVariant.MAINFIELD}
                messageVariant={MessageVariant.CREATE}
            />
        </section>
    );
}
