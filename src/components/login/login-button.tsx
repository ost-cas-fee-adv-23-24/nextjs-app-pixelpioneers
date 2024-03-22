'use client';

import { signIn, signOut } from 'next-auth/react';
import {
    Button,
    ButtonSize,
    IconLogoutAnimated,
    NaviButton,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { Session } from 'next-auth';

export enum LoginButtonType {
    NORMAL = 'normal',
    NAVIGATION = 'navigation',
}

export default function LoginButton({
    session,
    navBar = false,
    loginLabel = 'Log in',
    logoutLabel = 'Log out',
}: {
    session: Session | null;
    navBar?: boolean;
    loginLabel?: string;
    logoutLabel?: string;
}) {
    const label = session ? logoutLabel : loginLabel;
    const onClick = () => (session ? signOut() : signIn('zitadel'));
    if (navBar) {
        return (
            // static width for login and logout button container
            <div className="flex w-[68px] flex-col items-center">
                <NaviButton
                    size={ButtonSize.L}
                    label={label}
                    Icon={IconLogoutAnimated}
                    onClick={onClick}
                />
            </div>
        );
    }
    return (
        <Button
            variant={Variant.TERTIARY}
            size={ButtonSize.M}
            label={label}
            Icon={IconLogoutAnimated}
            onClick={onClick}
        />
    );
}
