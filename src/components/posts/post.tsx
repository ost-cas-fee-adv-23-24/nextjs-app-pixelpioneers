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
            <div className="z-5 absolute left-[-20px] top-[20px]">
                <Avatar
                    size={AvatarSize.S}
                    alt={post?.creator?.username}
                    src={post?.creator?.avatarUrl}
                />
            </div>
            <Label className="px-l pb-s pt-l" size={LabelSize.L} type={LabelType.SPAN}>
                Ben Hur
            </Label>
            <section className="flex flex-row gap-xs px-l">
                <IconLink
                    label={post?.creator?.username}
                    variant={Variant.PRIMARY}
                    Icon={IconProfile}
                />
                <IconLink label={'vor 11 Minuten'} variant={Variant.SECONDARY} Icon={IconTime} />
            </section>
            {post.text && <p className="px-l py-m">{post.text}</p>}
            <section className="flex flex-row px-m pb-m">
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
                    link="https://www.coop.ch"
                />
            </section>
        </article>
    );
}
