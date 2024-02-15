'use client';

import { signIn } from 'next-auth/react';
import {
    ButtonSize,
    IconMumble,
    NaviButton,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

export default function LoginButton() {
    return (
        <NaviButton
            size={ButtonSize.L}
            className="text-white"
            label={'Login'}
            Icon={IconMumble}
            onClick={() => signIn('zitadel')}
        />
    );
}
