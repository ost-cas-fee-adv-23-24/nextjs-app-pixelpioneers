import { Post } from '@/src/models/post.model';
import {
    Avatar,
    AvatarSize,
    IconLink,
    IconProfile,
    IconTime,
    Label,
    LabelSize,
    LabelType,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import React from 'react';

export default function PostHeader({ post }: { post: Post }) {
    return (
        <section className="gap-4 grid grid-flow-col grid-rows-2 place-items-center md:flex md:flex-col md:place-items-baseline">
            <div className="z-5 relative row-span-3 md:absolute md:left-[-32px] md:top-[20px]">
                <Avatar
                    size={AvatarSize.M}
                    alt={post?.creator?.username}
                    src={post?.creator?.avatarUrl}
                />
            </div>
            <Label className="col-span-2 md:flex md:pb-s" size={LabelSize.L} type={LabelType.SPAN}>
                Vorname Nachname
            </Label>
            <div className="col-span-2 row-span-2 flex gap-s md:flex md:flex-row">
                <IconLink
                    label={post.creator.username}
                    variant={Variant.PRIMARY}
                    Icon={IconProfile}
                />
                <IconLink
                    label={post.created.toString()}
                    variant={Variant.SECONDARY}
                    Icon={IconTime}
                />
            </div>
        </section>
    );
}
