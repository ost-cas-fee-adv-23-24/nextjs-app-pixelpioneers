'use client';

import { signIn, signOut } from 'next-auth/react';
import {
    Button,
    ButtonSize,
    IconLogoutAnimated,
    NaviButton,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

type LoginButtonProps = {
    isLoggedIn: boolean;
    navBar?: boolean;
    loginLabel?: string;
    logoutLabel?: string;
};

export default function LoginButton({
    isLoggedIn = false,
    navBar = false,
    loginLabel = 'Log in',
    logoutLabel = 'Log out',
}: LoginButtonProps) {
    const label = isLoggedIn ? logoutLabel : loginLabel;
    const onClick = () => (isLoggedIn ? signOut() : signIn('zitadel'));
    if (navBar) {
        return (
            // static min-width for login and logout button container to prevent layout shift in nav bar
            <div className="flex min-w-[68px] flex-col items-center">
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
