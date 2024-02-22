'use client';
import { Post } from '@/src/models/post.model';
import React, { ReactNode } from 'react';
import { Paragraph, ParagraphSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import clsx from 'clsx';
import PostHeader from '@/src/components/post/post-header';
import PostActions from '@/src/components/post/post-actions';
import Image from 'next/image';

export default function Post({
    post,
    children,
    inline = false,
}: {
    post: Post;
    children?: ReactNode;
    inline?: boolean;
}) {
    /*
     * TODO: gap-s or gap-m? patternlibrary = s, screendesign = m
     * TODO: width 680 or 615px?
     */
    const postClasses = clsx(
        'relative flex flex-col bg-white',
        'mx-0 w-full gap-s px-m py-s', // mobile
        'md:mx-m md:w-[680px] md:gap-m md:rounded-m md:px-xl md:py-l', // desktop
    );
    return (
        <article className={postClasses}>
            {/* TODO: replace PostHeader with display name as soon as display name composition done */}
            <PostHeader post={post} />
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
            {!inline && <PostActions post={post} />}
            {children}
        </article>
    );
}
