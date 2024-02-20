'use client';

import { signIn, signOut } from 'next-auth/react';
import {
    ButtonSize,
    IconLogoutAnimated,
    NaviButton,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { Session } from 'next-auth';

export default function LoginButton({ session }: { session: Session | null }) {
    return (
        <NaviButton
            size={ButtonSize.L}
            className="bg-primary-600 text-white hover:bg-primary-700"
            label={session ? 'Logout' : 'Login'}
            Icon={IconLogoutAnimated}
            onClick={() => (session ? signOut() : signIn('zitadel'))}
        />
    );
}
