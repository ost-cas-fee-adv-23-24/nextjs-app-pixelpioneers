'use client';
import { signIn } from 'next-auth/react';
import {
    Button,
    ButtonSize,
    IconProfile,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

export default function LoginButton() {
    return (
        <Button
            onClick={() => signIn('zitadel')}
            Icon={IconProfile}
            size={ButtonSize.M}
            label="Login with Zitadel"
        />
    );
}
