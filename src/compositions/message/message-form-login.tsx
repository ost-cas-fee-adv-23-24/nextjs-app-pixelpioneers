import { User } from '@/src/models/user.model';
import MessageForm from '@/src/components/message-form/message-form';
import { MessageVariant } from '@/src/compositions/message/types';
import LoginButton from '@/src/components/login/login-button';
import { ActionResponse } from '@/src/models/action.model';
import { Message } from '@/src/models/message.model';
import { Paragraph, ParagraphSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

type MessageFormLoginType = {
    user?: User;
    messageVariant: MessageVariant;
    onCreate: (formData: FormData) => Promise<ActionResponse<Message>>;
};
export default function MessageFormLogin({ user, messageVariant, onCreate }: MessageFormLoginType) {
    return user ? (
        <MessageForm user={user} messageVariant={messageVariant} onCreate={onCreate} />
    ) : (
        <div className="mx-m flex flex-row items-center gap-xs md:mx-0">
            <LoginButton isLoggedIn={false} loginLabel="Logge dich jetzt ein" />
            <Paragraph size={ParagraphSize.M}>{`um einen ${
                messageVariant === MessageVariant.POST ? 'Post' : 'Kommentar'
            } zu verfassen.`}</Paragraph>
        </div>
    );
}
