import { User } from '@/src/models/user.model';
import PostForm from '@/src/components/post-form/post-form';
import { MessageVariant } from '@/src/compositions/post/types';
import LoginButton from '@/src/components/login/login-button';
import { ActionResponse } from '@/src/models/action.model';
import { Message } from '@/src/models/post.model';

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
        <div className="flex flex-row items-center gap-xs py-l">
            <LoginButton session={null} loginLabel="Logge dich jetzt ein" />
            <span>{`um einen ${
                messageVariant === MessageVariant.POST ? 'Post' : 'Kommentar'
            } zu verfassen.`}</span>
        </div>
    );
}
