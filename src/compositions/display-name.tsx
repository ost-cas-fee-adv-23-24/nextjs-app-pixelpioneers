'use client';

import {
    Avatar,
    AvatarSize,
    // TODO: Heading
    // Heading,
    IconLink,
    IconLocation,
    IconProfile,
    IconTime,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

export default function DisplayName() {
    return (
        <div className="p-6 rounded-xl space-x-4 mx-auto flex max-w-sm items-center bg-white shadow-lg">
            <div className="shrink-0">
                <Avatar size={AvatarSize.S} alt="Dagobert Duck" />
            </div>
            <div>
                <div className="text-xl font-medium text-black">
                    {/* <Heading variant={HeadingLevel.H1} children='Heading 1' /> */}
                </div>
                <p className="text-slate-500">
                    <IconLink label="Username" Icon={IconProfile} variant={Variant.PRIMARY} />
                    <IconLink label="Timestamp" Icon={IconTime} variant={Variant.SECONDARY} />
                    <IconLink label="Location" Icon={IconLocation} variant={Variant.SECONDARY} />
                    <IconLink label="Joined" Icon={IconLocation} variant={Variant.SECONDARY} />
                </p>
            </div>
        </div>
    );
}
