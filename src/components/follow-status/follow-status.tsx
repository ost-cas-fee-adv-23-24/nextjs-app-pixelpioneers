'use client';
import { User } from '@/src/models/user.model';
import {
    Button,
    ButtonSize,
    IconCancel,
    IconCheckmark,
    Label,
    LabelSize,
    LabelType,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import React, { useEffect, useState } from 'react';
import { getProfileFollowingStatus } from '@/app/actions/profile';
import { followUser } from '@/app/actions/user';
import { ActionResponse } from '@/src/models/action.model';

type FollowStatusProps = {
    user: User;
};
export default function FollowStatus({ user }: FollowStatusProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!submitting) {
            const loadFollowingInfo = async () => {
                const isFollowingResponse = await getProfileFollowingStatus(user.id);
                if (isFollowingResponse.isError) {
                    // TODO: handle error ?
                    return false;
                }
                return isFollowingResponse.data.isFollowing;
            };
            loadFollowingInfo()
                .then((following) => setIsFollowing(following))
                .finally(() => setIsLoading(false));
        }
    }, [submitting, user]);

    const name = user.firstname ? `${user.firstname} ${user.lastname}` : user.username;
    return isLoading ? (
        // TODO: loading
        <>es ladet hallo</>
    ) : (
        <div className="flex flex-row items-center gap-m">
            <Label type={LabelType.SPAN} size={LabelSize.M} className="text-secondary-400">
                {`Du folgst ${name} ${isFollowing ? '' : 'nicht'}`}
            </Label>
            <form
                action={async (formData) => {
                    setSubmitting(true);
                    setIsFollowing(!isFollowing);
                    // TODO: handle errors for onFollow
                    const followUserResponse = JSON.parse(
                        await followUser(formData),
                    ) as ActionResponse<undefined>;
                    if (followUserResponse.isError) {
                        // TODO: set error
                    }
                    setSubmitting(false);
                }}
            >
                <input name="userId" value={user.id} hidden readOnly />
                <input name="isFollowing" value={String(isFollowing)} hidden readOnly />
                <Button
                    type="submit"
                    Icon={isFollowing ? IconCancel : IconCheckmark}
                    size={ButtonSize.M}
                    variant={Variant.SECONDARY}
                    label={isFollowing ? 'Unfollow' : 'Follow'}
                />
            </form>
        </div>
    );
}
