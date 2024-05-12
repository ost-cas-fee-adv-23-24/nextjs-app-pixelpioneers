'use client';

import {
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
import { User as UserModel } from '@/src/models/user.model';
import { APP_ROUTES, getRoute } from '@/src/services/route.service';
import { useRouter } from 'next/navigation';
import React from 'react';
import Avatar from '@/src/components/avatar/avatar';

type UserProps = {
    user: UserModel;
};

export default function User({ user }: UserProps) {
    const router = useRouter();
    return (
        <section className="flex flex-col items-center gap-s rounded-m bg-white p-s">
            <Avatar
                desktopSize={AvatarSize.L}
                mobileSize={AvatarSize.M}
                avatarUrl={user.avatarUrl}
                username={user.username}
            />
            <div className="flex flex-col gap-xs text-center">
                <Label size={LabelSize.M}>
                    {user.firstname} {user.lastname}
                </Label>
                <IconLink
                    className="self-center"
                    label={user.username}
                    Icon={IconProfile}
                    variant={Variant.PRIMARY}
                    onClick={() => router.push(getRoute(APP_ROUTES.USER, user.id))}
                />
            </div>
            <Button
                Icon={IconMumble}
                size={ButtonSize.M}
                variant={Variant.PRIMARY}
                label="Anzeigen"
                className="hover:cursor-pointer"
                onClick={() => router.push(getRoute(APP_ROUTES.USER, user.id))}
                fill
            />
        </section>
    );
}
