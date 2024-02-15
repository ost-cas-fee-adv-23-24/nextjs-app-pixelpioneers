'use client';

import { signOut } from 'next-auth/react';
import {
    ButtonSize,
    IconLogoutAnimated,
    NaviButton,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

export default function LogoutButton() {
    return (
        <NaviButton
            size={ButtonSize.L}
            className="text-white"
            label={'Logout'}
            Icon={IconLogoutAnimated}
            onClick={() => signOut()}
        />
    );
}
