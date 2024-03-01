import DisplayName from '@/src/compositions/display-name/display-name';
import { AvatarPostion } from '@/src/compositions/display-name/types';
import { LabelSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import React from 'react';

const mockUserData = {
    id: '179944860378202369',
    username: 'max_muster',
    avatarUrl: 'string',
    firstName: 'string',
    lastName: 'string',
};

export default async function Settings() {
    return (
        <>
            Page: Settings
            <DisplayName
                user={mockUserData}
                labelSize={LabelSize.S}
                showAvatar
                avatarSpecialPosition={AvatarPostion.SPECIAL}
            />
            <DisplayName user={mockUserData} labelSize={LabelSize.M} showAvatar />
            <DisplayName user={mockUserData} labelSize={LabelSize.L} showAvatar />
            <DisplayName user={mockUserData} labelSize={LabelSize.XL} showAvatar />
            <DisplayName user={mockUserData} labelSize={LabelSize.S} />
            <DisplayName user={mockUserData} labelSize={LabelSize.M} />
            <DisplayName user={mockUserData} labelSize={LabelSize.L} />
            <DisplayName user={mockUserData} labelSize={LabelSize.XL} />
        </>
    );
}
