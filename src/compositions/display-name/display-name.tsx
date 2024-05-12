'use client';
import {
    AvatarSize,
    Heading,
    HeadingLevel,
    IconCalendar,
    IconLink,
    IconLocation,
    IconProfile,
    IconSettingsAnimated,
    IconTime,
    Label,
    LabelSize,
    LabelType,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { User } from '@/src/models/user.model';
import { DisplayNameVariant } from '@/src/compositions/display-name/types';
import { APP_ROUTES, getRoute } from '@/src/services/route.service';
import { useRouter } from 'next/navigation';
import { timeFromNow } from '@/src/services/time.service';
import Link from 'next/link';
import Avatar from '@/src/components/avatar/avatar';

type DisplayNameProps = {
    user: User;
    variant: DisplayNameVariant;
    postTimestamp?: number;
    location?: string;
    joinedTimestamp?: number;
    isActiveUser?: boolean;
};

export default function DisplayName({
    user,
    variant,
    postTimestamp,
    location,
    joinedTimestamp,
    isActiveUser,
}: DisplayNameProps) {
    const router = useRouter();
    const userFullName = () =>
        user.firstname ? `${user.firstname} ${user.lastname}` : 'Mumble User';
    const labelSize = (): LabelSize => {
        switch (variant) {
            case DisplayNameVariant.REPLY:
                return LabelSize.M;
            case DisplayNameVariant.POST_TIMELINE:
                return LabelSize.L;
            default:
                return LabelSize.XL;
        }
    };
    return (
        <section className="relative flex flex-row">
            {variant === DisplayNameVariant.REPLY && (
                <div className="relative self-center pr-xs">
                    <Link href={getRoute(APP_ROUTES.USER, user.id)}>
                        <Avatar
                            desktopSize={AvatarSize.S}
                            avatarUrl={user.avatarUrl}
                            username={user.username}
                        />
                    </Link>
                </div>
            )}
            <div className="flex flex-col gap-xs">
                <div className="flex w-full flex-wrap place-items-baseline items-center gap-xs">
                    {variant === DisplayNameVariant.PROFILE ? (
                        <Heading variant={HeadingLevel.H3} className="text-secondary-900">
                            {userFullName()}
                        </Heading>
                    ) : (
                        <Link href={getRoute(APP_ROUTES.USER, user.id)}>
                            <Label
                                className="text-secondary-900"
                                size={labelSize()}
                                type={LabelType.SPAN}
                            >
                                {userFullName()}
                            </Label>
                        </Link>
                    )}
                    {variant === DisplayNameVariant.PROFILE && isActiveUser && (
                        <button disabled>
                            <IconSettingsAnimated className="fill-primary-600" />
                        </button>
                    )}
                </div>
                <div className="flex w-full flex-wrap place-items-baseline gap-s">
                    <IconLink
                        label={user.username}
                        variant={Variant.PRIMARY}
                        Icon={IconProfile}
                        onClick={() => router.push(getRoute(APP_ROUTES.USER, user.id))}
                    />
                    {postTimestamp && (
                        <IconLink
                            label={timeFromNow(postTimestamp)}
                            variant={Variant.SECONDARY}
                            Icon={IconTime}
                        />
                    )}
                    {location && (
                        <IconLink
                            label={location}
                            variant={Variant.SECONDARY}
                            Icon={IconLocation}
                        />
                    )}
                    {joinedTimestamp && (
                        <IconLink label="Joined" variant={Variant.SECONDARY} Icon={IconCalendar} />
                    )}
                </div>
            </div>
        </section>
    );
}
