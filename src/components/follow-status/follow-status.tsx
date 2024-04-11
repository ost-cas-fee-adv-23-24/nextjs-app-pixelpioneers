'use client';
import { FollowingType, User } from '@/src/models/user.model';
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
import LoginButton from '@/src/components/login/login-button';
import { ActionResponse } from '@/src/models/action.model';

export default function FollowStatus({
    user,
    onFollow,
    followedByActiveUser,
}: {
    user: User;
    onFollow: () => Promise<ActionResponse<void>>;
    followedByActiveUser: FollowingType;
}) {
    const name = user.firstname ? `${user.firstname} ${user.lastname}` : user.username;
    const isFollowing = followedByActiveUser === FollowingType.FOLLOWING;
    if (followedByActiveUser === FollowingType.NOT_LOGGED_IN) {
        return (
            <div className="flex flex-row items-center gap-xs">
                <LoginButton session={null} loginLabel="Logge dich jetzt ein" />
                <span>um {user.username} zu folgen.</span>
            </div>
        );
    }
    // TODO: handle errors for onFollow
    return (
        <div className="flex flex-row items-center gap-m">
            <Label type={LabelType.SPAN} size={LabelSize.M} className="text-secondary-400">
                {`Du folgst ${name} ${!isFollowing && 'nicht'}`}
            </Label>
            <form action={onFollow}>
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
