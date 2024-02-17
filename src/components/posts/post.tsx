'use client';
import { Post } from '@/src/models/post.model';
import React from 'react';
import {
    Avatar,
    AvatarSize,
    CommentButton,
    IconLink,
    IconProfile,
    IconTime,
    Label,
    LabelSize,
    LabelType,
    LikeButton,
    ShareButton,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { likePost, unlikePost } from '@/app/actions';

export default function Post({ post }: { post: Post }) {
    return (
        <article className="relative flex min-h-[140px] flex-col rounded-m bg-white md:w-[680px]">
            <section className="gap-4 grid grid-flow-col grid-rows-2 px-xl pt-l md:flex md:flex-col">
                <div className="z-5 relative row-span-3 md:absolute md:left-[-32px] md:top-[20px]">
                    <Avatar
                        size={AvatarSize.M}
                        alt={post?.creator?.username}
                        src={post?.creator?.avatarUrl}
                    />
                </div>
                <Label className="col-span-2 pb-s md:flex" size={LabelSize.L} type={LabelType.SPAN}>
                    Vorname Nachname
                </Label>
                <div className="col-span-2 row-span-2 flex gap-s md:flex md:flex-row">
                    <IconLink
                        label={post?.creator?.username}
                        variant={Variant.PRIMARY}
                        Icon={IconProfile}
                    />
                    <IconLink
                        label={'vor 11 Minuten'}
                        variant={Variant.SECONDARY}
                        Icon={IconTime}
                    />
                </div>
            </section>
            {post.text && <p className="px-xl py-m">{post.text}</p>}
            <section className="ml-[-12px] flex flex-row gap-x-m px-xl pb-m md:gap-x-l">
                <CommentButton amount={post.replies} />
                <LikeButton
                    onClick={async () =>
                        post.likedBySelf ? await unlikePost(post.id) : await likePost(post.id)
                    }
                    isLiked={post.likedBySelf || false}
                    amount={post.likes}
                />
                <ShareButton
                    label="Copy Link"
                    labelShared="Link copied"
                    link="https://www.denner.ch"
                />
            </section>
        </article>
    );
}
