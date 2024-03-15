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

export default function FollowStatus({
    user,
    onFollow,
    followedByActiveUser,
}: {
    user: User;
    onFollow: () => Promise<void>;
    followedByActiveUser: boolean;
}) {
    const name = user.firstname ? `${user.firstname} ${user.lastname}` : user.username;
    return (
        <div className="flex flex-row items-center gap-m">
            <Label type={LabelType.SPAN} size={LabelSize.M} className="text-secondary-400">
                Du folgst {name} {!followedByActiveUser && 'nicht'}
            </Label>
            <form action={onFollow}>
                <Button
                    type="submit"
                    Icon={followedByActiveUser ? IconCancel : IconCheckmark}
                    size={ButtonSize.M}
                    variant={Variant.SECONDARY}
                    label={followedByActiveUser ? 'Unfollow' : 'Follow'}
                />
            </form>
        </div>
    );
}
