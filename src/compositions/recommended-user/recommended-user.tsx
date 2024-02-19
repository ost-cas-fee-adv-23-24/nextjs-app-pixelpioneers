'use client';

import {
    Avatar,
    AvatarSize,
    Button,
    ButtonSize,
    IconLink,
    IconMumble,
    IconProfile,
    Label,
    LabelSize,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

// TODO: Need to sync with the team realting different sizes
export default function RecommendedUser() {
    return (
        <section className="flex flex-col items-center space-y-s rounded-m border border-secondary-300 bg-white p-s hover:bg-secondary-100 md:h-[242px] md:w-[216px]">
            <Avatar size={AvatarSize.L} alt="Michael Jackson" />
            <div className="w-full text-center">
                <Label size={LabelSize.M} aria-label={'Vorname Nachname'} className="line-clamp-1">
                    Vorname Nachname
                </Label>
            </div>

            <IconLink
                className="mr-xs"
                label="Username"
                Icon={IconProfile}
                variant={Variant.PRIMARY}
            />
            <Button
                Icon={IconMumble}
                size={ButtonSize.M}
                variant={Variant.PRIMARY}
                label="Follow"
                className="hover:cursor-pointer"
            />
        </section>
    );
}
