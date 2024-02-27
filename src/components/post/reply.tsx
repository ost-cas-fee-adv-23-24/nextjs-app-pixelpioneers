'use client';
import { Reply } from '@/src/models/post.model';
import React, { ReactNode } from 'react';
import { Paragraph, ParagraphSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import clsx from 'clsx';
import DisplayName from '@/src/compositions/display-name/display-name';

export default function Reply({ reply, children }: { reply: Reply; children?: ReactNode }) {
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
            <DisplayName />
            {reply.mediaUrl && (
                <section className="relative h-[500px] w-full">
                    {/*<Image
                        // TODO: fix 500px static height, cache images?
                        className="rounded-s"
                        alt={`image from ${reply.creator.username}`}
                        src={reply.mediaUrl}
                        datatype={reply.mediaType}
                        style={{ objectFit: 'cover' }}
                        fill
                    />*/}
                </section>
            )}
            {reply.text && <Paragraph size={ParagraphSize.M}>{reply.text}</Paragraph>}
            {children}
        </article>
    );
}
