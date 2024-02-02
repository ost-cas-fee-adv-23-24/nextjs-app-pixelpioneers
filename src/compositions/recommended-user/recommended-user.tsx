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
        <section className="flex h-[242px] w-[174px] flex-col items-center space-y-s rounded-m border border-secondary-300 bg-white p-m hover:bg-secondary-100">
            <Avatar size={AvatarSize.M} alt="Michael Jackson" />
            <Label
                size={LabelSize.M}
                title={'Michael Jackson'}
                aria-label={'Michael Jackson'}
                className="... truncate"
            >
                Michael Jackson
            </Label>
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
            />
        </section>
    );
}
