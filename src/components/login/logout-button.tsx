'use client';

import { signOut } from 'next-auth/react';
import {
    Button,
    ButtonSize,
    IconProfile,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

export default function LogoutButton() {
    return (
        <Button
            onClick={() => signOut()}
            label="Logout"
            size={ButtonSize.M}
            variant={Variant.TERTIARY}
            Icon={IconProfile}
        />
    );
}
