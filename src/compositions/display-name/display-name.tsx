'use client';

import {
    Avatar,
    AvatarSize,
    Heading,
    HeadingLevel,
    IconLink,
    IconLocation,
    IconProfile,
    IconTime,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

// TODO: Need to sync with the team realting different sizes
export default function DisplayName() {
    return (
        <section className="rounded-xl space-x-4 mx-auto flex max-w-sm items-center p-m">
            <div className="mr-xs shrink-0">
                <Avatar size={AvatarSize.S} alt="George Michael" />
            </div>
            <div>
                <div>
                    <Heading variant={HeadingLevel.H4}>George Michael</Heading>
                </div>
                <p className="inline-flex">
                    <IconLink
                        className="mr-xs"
                        label="Username"
                        Icon={IconProfile}
                        variant={Variant.PRIMARY}
                    />
                    <IconLink
                        className="mr-xs"
                        label="Timestamp"
                        Icon={IconTime}
                        variant={Variant.SECONDARY}
                    />
                    <IconLink
                        className="mr-xs"
                        label="Location"
                        Icon={IconLocation}
                        variant={Variant.SECONDARY}
                    />
                    <IconLink
                        className="mr-xs"
                        label="Joined"
                        Icon={IconLocation}
                        variant={Variant.SECONDARY}
                    />
                </p>
            </div>
        </section>
    );
}
