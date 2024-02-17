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
    return session ? (
        <NaviButton
            size={ButtonSize.L}
            className="text-white"
            label={'Logout'}
            Icon={IconLogoutAnimated}
            onClick={() => signOut()}
        />
    ) : (
        <NaviButton
            size={ButtonSize.L}
            className="text-white"
            label={'Login'}
            Icon={IconMumble}
            onClick={() => signIn('zitadel')}
        />
    );
}
