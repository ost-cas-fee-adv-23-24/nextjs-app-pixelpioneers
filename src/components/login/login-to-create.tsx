import LoginButton from '@/src/components/login/login-button';
import { Paragraph, ParagraphSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { MessageVariant } from '@/src/compositions/message/types';

type LoginToCreateProps = {
    messageVariant: MessageVariant;
};
export default function LoginToCreate({ messageVariant }: LoginToCreateProps) {
    return (
        <div className="mx-m flex flex-row items-center gap-xs md:mx-0">
            <LoginButton isLoggedIn={false} loginLabel="Logge dich jetzt ein" />
            <Paragraph className="text-secondary-900" size={ParagraphSize.M}>{`um einen ${
                messageVariant === MessageVariant.POST ? 'Post' : 'Kommentar'
            } zu verfassen.`}</Paragraph>
        </div>
    );
}
