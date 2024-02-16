'use client';

import {
    Avatar,
    AvatarSize,
    ButtonSize,
    IconSettingsAnimated,
    LogoMumbleHorizontal,
    NaviButton,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import LoginButton from '../login/login-button';
import { Session } from 'next-auth';

export default function Navigation({ session }: { session: Session | null }) {
    return (
        <nav className="flex h-[80px] w-full items-center justify-around bg-primary-600 md:content-center">
            <div className="flex w-[800px] flex-row">
                <LogoMumbleHorizontal
                    titleClasses="fill-white"
                    iconClasses="fill-white"
                    sizeWidth="235"
                    sizeHeight="34"
                    className="hidden md:flex"
                />
                <section className="flex flex-1 flex-row-reverse items-center">
                    <LoginButton session={session} />
                    <NaviButton
                        size={ButtonSize.L}
                        className="text-white"
                        label={'Settings'}
                        Icon={IconSettingsAnimated}
                    />
                    <Avatar size={AvatarSize.S} alt="George Michael" />
                </section>
            </div>
        </nav>
    );
}
