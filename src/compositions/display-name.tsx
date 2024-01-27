'use client';

import {
    Avatar,
    AvatarSize,
    // Heading,
    IconLink,
    IconLocation,
    IconProfile,
    IconTime,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

export default function DisplayName() {
    return (
        <>
            <Avatar size={AvatarSize.S} alt="Dagobert Duck" />
            {/* <Heading variant={HeadingLevel.H1} children='Heading 1' /> */}
            <IconLink label="Username" Icon={IconProfile} variant={Variant.PRIMARY} />
            <IconLink label="Timestamp" Icon={IconTime} variant={Variant.SECONDARY} />
            <IconLink label="Location" Icon={IconLocation} variant={Variant.SECONDARY} />
            <IconLink label="Joined" Icon={IconLocation} variant={Variant.SECONDARY} />
        </>
    );
}
