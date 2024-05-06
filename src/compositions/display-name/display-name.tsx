'use client';
import {
    Avatar,
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
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';
import { useRouter } from 'next/navigation';
import { timeFromNow } from '@/src/services/time.service';
import Link from 'next/link';

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
                <div className="relative pr-xs">
                    <Link href={getRoute(APP_ROUTES.USER, user.id)}>
                        <Avatar
                            size={AvatarSize.S}
                            alt={`avatar from ${user.username}`}
                            src={user.avatarUrl}
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
                        <button onClick={() => alert('settings') /* TODO: open settings */}>
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
                            // since timestamps will have time differences from server to client
                            suppressHydrationWarning
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
