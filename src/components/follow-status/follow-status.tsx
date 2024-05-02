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

type FollowStatusProps = {
    user: User;
};
export default function FollowStatus({ user }: FollowStatusProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const loadFollowingInfo = async () => {
            const isFollowingResponse = await getProfileFollowingStatus(user.id);
            if (isFollowingResponse.isError) {
                // TODO: handle error
                return false;
            }
            return isFollowingResponse.data.isFollowing;
        };
        loadFollowingInfo()
            .then((following) => setIsFollowing(following))
            .finally(() => setIsLoading(false));
    }, [user]);

    const name = user.firstname ? `${user.firstname} ${user.lastname}` : user.username;
    // TODO: handle errors for onFollow
    return isLoading ? (
        <>es ladet hallo</>
    ) : (
        <div className="flex flex-row items-center gap-m">
            <Label type={LabelType.SPAN} size={LabelSize.M} className="text-secondary-400">
                {`Du folgst ${name} ${!isFollowing ? 'nicht' : ''}`}
            </Label>
            <form
                action={
                    async (/*formData*/) => {
                        setIsFollowing(!isFollowing);
                        //await followUser(formData);
                    }
                }
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
