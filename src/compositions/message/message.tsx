import { Message } from '@/src/models/message.model';
import React, { ReactNode } from 'react';
import {
    Avatar,
    AvatarSize,
    Paragraph,
    ParagraphSize,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import clsx from 'clsx';
import MessageActions from '@/src/compositions/message/message-actions';
import Image from 'next/image';
import DisplayName from '@/src/compositions/display-name/display-name';
import { DisplayNameVariant } from '@/src/compositions/display-name/types';
import { MessageDisplayVariant } from '@/src/compositions/message/types';

type MessageProps = {
    message: Message;
    displayVariant: MessageDisplayVariant;
    children?: ReactNode;
};

export default function Message({ message, displayVariant, children }: MessageProps) {
    const isVariant = (variantToCheck: MessageDisplayVariant): boolean =>
        displayVariant === variantToCheck;
    const displayNameVariant = (): DisplayNameVariant => {
        switch (displayVariant) {
            case MessageDisplayVariant.DETAIL_VIEW:
                return DisplayNameVariant.POST_DETAIL_VIEW;
            case MessageDisplayVariant.TIMELINE:
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
        }[displayVariant],
    );
    const avatarClasses = clsx(
        'z-5 relative row-span-3', // mobile
        'md:absolute md:left-[-32px] md:top-[20px]', // desktop
    );
    return (
        <div className={postClasses}>
            <div className="flex flex-row items-center gap-s md:flex-col md:items-start">
                {!isVariant(MessageDisplayVariant.INLINE) && (
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
                    // TODO: set in design system
                    className="break-words"
                    size={
                        isVariant(MessageDisplayVariant.DETAIL_VIEW)
                            ? ParagraphSize.L
                            : ParagraphSize.M
                    }
                >
                    {message.text}
                </Paragraph>
            )}
            {message.mediaUrl && (
                <section className="relative h-auto w-full transition duration-500 hover:scale-105 md:h-[320px]">
                    <Image
                        className="rounded-s"
                        alt={`Bild von ${message.creator.username}`}
                        src={message.mediaUrl}
                        datatype={message.mediaType}
                        quality={75}
                        priority
                        height={320}
                        width={584}
                        aria-label={`Bild von ${message.creator.username}`}
                        sizes="(max-width: 584px) 100vw"
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </section>
            )}
            {!isVariant(MessageDisplayVariant.INLINE) && (
                <MessageActions
                    post={message}
                    detailView={isVariant(MessageDisplayVariant.DETAIL_VIEW)}
                />
            )}
            {isVariant(MessageDisplayVariant.DETAIL_VIEW) && children}
        </div>
    );
}
