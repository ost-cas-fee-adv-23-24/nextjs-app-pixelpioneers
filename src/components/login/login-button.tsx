'use client';

import { signIn, signOut } from 'next-auth/react';
import {
    ButtonSize,
    IconLogoutAnimated,
    IconMumble,
    NaviButton,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { Session } from 'next-auth';

export default function LoginButton({ session }: { session: Session | null }) {
    const classNavButton = 'bg-primary-600 hover:bg-primary-700 text-white';

    return session ? (
        <NaviButton
            size={ButtonSize.L}
            className={classNavButton}
            label={'Logout'}
            Icon={IconLogoutAnimated}
            onClick={() => signOut()}
        />
    ) : (
        <NaviButton
            size={ButtonSize.L}
            className={classNavButton}
            label={'Login'}
            Icon={IconMumble}
            onClick={() => signIn('zitadel')}
        />
    );
}
