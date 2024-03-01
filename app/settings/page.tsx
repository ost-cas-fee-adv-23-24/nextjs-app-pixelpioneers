import DisplayName from '@/src/compositions/display-name/display-name';
import { AvatarPostion } from '@/src/compositions/display-name/types';
import { LabelSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import React from 'react';

export default async function Settings() {
    return (
        <>
            Page: Settings
            <DisplayName
                labelSize={LabelSize.S}
                showAvatar
                avatarSpecialPosition={AvatarPostion.SPECIAL}
            />
            <DisplayName labelSize={LabelSize.M} showAvatar />
            <DisplayName labelSize={LabelSize.L} showAvatar />
            <DisplayName labelSize={LabelSize.XL} showAvatar />
            <DisplayName labelSize={LabelSize.S} showAvatar />
            <DisplayName labelSize={LabelSize.M} showAvatar />
            <DisplayName labelSize={LabelSize.L} showAvatar />
            <DisplayName labelSize={LabelSize.XL} showAvatar />
            <DisplayName labelSize={LabelSize.S} />
            <DisplayName labelSize={LabelSize.M} />
            <DisplayName labelSize={LabelSize.L} />
            <DisplayName labelSize={LabelSize.XL} />
        </>
    );
}
