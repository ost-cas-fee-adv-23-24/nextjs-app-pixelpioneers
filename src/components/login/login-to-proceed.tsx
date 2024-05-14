import LoginButton from '@/src/components/login/login-button';
import { Label, LabelSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { MessageDisplayVariant } from '@/src/compositions/message/types';
import clsx from 'clsx';

type LoginToCreateProps = {
    message: string;
    displayVariant: MessageDisplayVariant;
};
export default function LoginToProceed({ message, displayVariant }: LoginToCreateProps) {
    const isTimeline = displayVariant === MessageDisplayVariant.TIMELINE;
    const containerClasses = clsx(
        isTimeline && 'mx-m md:mx-0',
        'flex flex-row items-center justify-center gap-s',
    );
    return (
        <div className={containerClasses}>
            <LoginButton isLoggedIn={false} />
            <Label className="text-secondary-400" size={LabelSize.M}>
                {message}
            </Label>
        </div>
    );
}
