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
    message: Message;
    variant: PostVariant;
    children?: ReactNode;
};

export default function Post({ message, variant, children }: PostProps) {
    const isVariant = (variantToCheck: PostVariant): boolean => variant === variantToCheck;
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
    const detailPostClasses = clsx(
        'mx-0 w-full px-m py-s', // mobile
        'md:w-[680px] md:gap-m md:rounded-m md:px-xl md:py-l', // desktop
    );
    const postClasses = clsx(
        'relative flex flex-col gap-s bg-white',
        {
            inline: '',
            timeline: clsx(
                detailPostClasses,
                'md:duration-300 md:ease-in-out md:hover:ring-2 md:hover:ring-secondary-200',
            ),
            detailView: detailPostClasses,
        }[variant],
    );
    const avatarClasses = clsx(
        'z-5 relative row-span-3',
        'md:absolute md:left-[-32px] md:top-[20px]', // desktop
    );
    return (
        <div className={postClasses}>
            <div className="flex flex-row items-center gap-s md:flex-col md:items-start">
                {!isVariant(PostVariant.INLINE) && (
                    <div className={avatarClasses}>
                        <Avatar
                            // TODO: make size S on mobile
                            size={AvatarSize.M}
                            alt={`avatar from ${message.creator.username}`}
                            src={message.creator.avatarUrl}
                        />
                    </div>
                )}
                <DisplayName
                    user={message.creator}
                    variant={displayNameVariant()}
                    postTimestamp={message.created}
                />
            </div>
            {message.text && (
                <Paragraph
                    size={isVariant(PostVariant.DETAIL_VIEW) ? ParagraphSize.L : ParagraphSize.M}
                >
                    {message.text}
                </Paragraph>
            )}
            {message.mediaUrl && (
                <section className="relative h-[320px] w-full">
                    <Image
                        // TODO: fix 320px static height, cache images?
                        className="rounded-s"
                        alt={`image from ${message.creator.username}`}
                        src={message.mediaUrl}
                        datatype={message.mediaType}
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 584px) 100vw"
                        fill
                    />
                </section>
            )}
            {!isVariant(PostVariant.INLINE) && (
                <PostActions post={message} detailView={isVariant(PostVariant.DETAIL_VIEW)} />
            )}
            {isVariant(PostVariant.DETAIL_VIEW) && children}
        </div>
    );
}
