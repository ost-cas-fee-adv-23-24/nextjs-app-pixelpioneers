import { Message } from '@/src/models/post.model';
import React, { ReactNode } from 'react';
import {
    Avatar,
    AvatarSize,
    Paragraph,
    ParagraphSize,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import clsx from 'clsx';
import PostActions from '@/src/compositions/post/post-actions';
import Image from 'next/image';
import DisplayName from '@/src/compositions/display-name/display-name';
import { DisplayNameVariant } from '@/src/compositions/display-name/types';
import { PostVariant } from '@/src/compositions/post/types';

type PostProps = {
    post: Message;
    variant: PostVariant;
    children?: ReactNode;
};

export default function Post({ post, variant, children }: PostProps) {
    /*
     * TODO: gap-s or gap-m? patternlibrary = s, screendesign = m
     * TODO: width 680 or 615px?
     */
    const postClasses = clsx(
        'relative flex flex-col bg-white',
        'mx-0 w-full gap-s px-m py-s', // mobile
        'md:mx-m md:w-[680px] md:gap-m md:rounded-m md:px-xl md:py-l', // desktop
    );
    const displayNameVariant = (): DisplayNameVariant => {
        switch (variant) {
            case PostVariant.DETAIL_VIEW:
                return DisplayNameVariant.POST_DETAIL_VIEW;
            case PostVariant.TIMELINE:
                return DisplayNameVariant.POST_TIMELINE;
            default:
                return DisplayNameVariant.REPLY;
        }
    };
    return (
        <article className={postClasses}>
            <div className="z-5 relative row-span-3 md:absolute md:left-[-32px] md:top-[20px]">
                <Avatar
                    size={AvatarSize.M}
                    alt={`avatar from ${post.creator.username}`}
                    src={post.creator.avatarUrl}
                />
            </div>
            <DisplayName user={post.creator} variant={displayNameVariant()} />
            {post.mediaUrl && (
                <section className="relative h-[500px] w-full">
                    <Image
                        // TODO: fix 500px static height, cache images?
                        className="rounded-s"
                        alt={`image from ${post.creator.username}`}
                        src={post.mediaUrl}
                        datatype={post.mediaType}
                        style={{ objectFit: 'cover' }}
                        fill
                    />
                </section>
            )}
            {post.text && <Paragraph size={ParagraphSize.M}>{post.text}</Paragraph>}
            <PostActions post={post} detailView={variant === PostVariant.DETAIL_VIEW} />
            {children}
        </article>
    );
}
