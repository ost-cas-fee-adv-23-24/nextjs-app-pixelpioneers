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
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';
import { useRouter } from 'next/navigation';

export enum DisplayNameVariant {
    REPLY = 'reply',
    POST_TIMELINE = 'post-timeline',
    POST_DETAIL_VIEW = 'post-detail-view',
    PROFILE = 'profile',
}

type DisplayNameProps = {
    user: User;
    variant: DisplayNameVariant;
    postTimestamp?: number;
    location?: string;
    joinedTimestamp?: number;
};

export default function DisplayName({
    user,
    variant,
    postTimestamp,
    location,
    joinedTimestamp,
}: DisplayNameProps) {
    const router = useRouter();
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
        <>
            <section className="relative flex flex-row">
                <div className="relative pr-xs">
                    {variant === DisplayNameVariant.REPLY && user?.avatarUrl && (
                        <Avatar
                            size={AvatarSize.S}
                            alt={`avatar from ${user.username}`}
                            src={user.avatarUrl}
                        />
                    )}
                </div>
                <div className="flex flex-col gap-xs">
                    <div className="flex w-full flex-wrap place-items-baseline">
                        {variant === DisplayNameVariant.PROFILE ? (
                            <Heading variant={HeadingLevel.H3}>Vorname Nachname</Heading>
                        ) : (
                            <Label size={labelSize()} type={LabelType.SPAN}>
                                Vorname Nachname
                            </Label>
                        )}

                        {/* TODO: check if user logged in, show settings only if so */}
                        {variant === DisplayNameVariant.PROFILE && (
                            <IconLink
                                label=""
                                variant={Variant.PRIMARY}
                                Icon={IconSettingsAnimated}
                                className="pl-xs"
                            />
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
                                label={postTimestamp.toString()}
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
                            <IconLink
                                label="Joined"
                                variant={Variant.SECONDARY}
                                Icon={IconCalendar}
                            />
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
