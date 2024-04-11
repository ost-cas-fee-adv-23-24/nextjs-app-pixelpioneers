import { User } from '@/src/models/user.model';
import PostForm from '@/src/components/post-form/post-form';
import { MessageVariant } from '@/src/compositions/post/types';
import LoginButton from '@/src/components/login/login-button';
import { ActionResponse } from '@/src/models/action.model';
import { Message } from '@/src/models/post.model';
import { Paragraph, ParagraphSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

export default function PostFormOrLogin({
    user,
    messageVariant,
    onCreate,
}: {
    user?: User;
    messageVariant: MessageVariant;
    onCreate: (formData: FormData) => Promise<ActionResponse<Message>>;
}) {
    return user ? (
        <PostForm user={user} messageVariant={messageVariant} onCreate={onCreate} />
    ) : (
        <div className="mx-m flex flex-row items-center gap-xs md:mx-0">
            <LoginButton session={null} loginLabel="Logge dich jetzt ein" />
            <Paragraph size={ParagraphSize.M}>{`um einen ${
                messageVariant === MessageVariant.POST ? 'Post' : 'Kommentar'
            } zu verfassen.`}</Paragraph>
        </div>
    );
}
