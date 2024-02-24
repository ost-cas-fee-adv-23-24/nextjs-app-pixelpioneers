'use client';

import { Post } from '@/src/models/post.model';
import {
    Avatar,
    AvatarSize,
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
import clsx from 'clsx';
import { AvatarPostion } from './types';

export default function DisplayName({
    post, // eslint-disable-line
    showAvatar,
    avatarSpecialPosition = 0,
    showTimestamp,
    showLocation,
    showJoined,
    showSetting,
    labelSize,
}: {
    post: Post | null;
    showAvatar?: boolean;
    avatarSpecialPosition?: AvatarPostion;
    showTimestamp?: boolean;
    showLocation?: boolean;
    showJoined?: boolean;
    showSetting?: boolean;
    labelSize: LabelSize;
}) {
    // if (!post) return null;

    return (
        <>
            <section className="relative flex flex-row">
                <div
                    className={clsx(
                        avatarSpecialPosition === 0
                            ? 'relative pr-xs'
                            : 'z-5 md:absolute md:left-[-62px]',
                    )}
                >
                    {showAvatar && (
                        <Avatar
                            size={AvatarSize.S}
                            alt={'post?.creator?.username'}
                            src={'post?.creator?.avatarUrl'}
                        />
                    )}
                </div>
                <div className="flex flex-col gap-xs">
                    <div className="flex w-full flex-wrap place-items-baseline">
                        <Label size={labelSize} type={LabelType.SPAN}>
                            Vorname Nachname
                        </Label>
                        {showSetting && (
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
                            label={'post.creator.username'}
                            variant={Variant.PRIMARY}
                            Icon={IconProfile}
                        />
                        {showTimestamp && (
                            <IconLink
                                label={'post.created.toString()'}
                                variant={Variant.SECONDARY}
                                Icon={IconTime}
                            />
                        )}
                        {showLocation && (
                            <IconLink
                                label="Location"
                                variant={Variant.SECONDARY}
                                Icon={IconLocation}
                            />
                        )}
                        {showJoined && (
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
