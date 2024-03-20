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

export default function FollowStatus({
    user,
    onFollow,
    followedByActiveUser,
}: {
    user: User;
    onFollow: () => Promise<void>;
    followedByActiveUser: FollowingType;
}) {
    const name = user.firstname ? `${user.firstname} ${user.lastname}` : user.username;
    const isFollowing = followedByActiveUser === FollowingType.FOLLOWING;
    if (followedByActiveUser === FollowingType.NOT_LOGGED_IN) {
        // TODO: LOGIN button
        return <div>Logge dich jetzt ein, um {user.username} zu folgen.</div>;
    }
    return (
        <div className="flex flex-row items-center gap-m">
            <Label type={LabelType.SPAN} size={LabelSize.M} className="text-secondary-400">
                Du folgst {name} {!isFollowing && 'nicht'}
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
