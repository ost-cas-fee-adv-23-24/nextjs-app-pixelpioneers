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
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';
import Link from 'next/link';
import LinkWrapper from '@/src/components/link-wrapper/link-wrapper';

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
    const detailMessageClasses = clsx(
        'mx-0 w-full px-m py-s', // mobile
        'md:w-container md:gap-m md:rounded-m md:px-xl md:py-l', // desktop
    );
    const messageClasses = clsx(
        'relative flex flex-col gap-s bg-white',
        {
            inline: '',
            timeline: clsx(
                detailMessageClasses,
                'md:duration-300 md:ease-in-out md:hover:ring-2 md:hover:ring-secondary-200',
            ),
            detailView: detailMessageClasses,
        }[displayVariant],
    );
    const avatarClasses = clsx(
        'z-5 relative row-span-3', // mobile
        'md:absolute md:left-[-32px] md:top-[20px]', // desktop
    );
    return (
        <div className={messageClasses}>
            <div className="flex flex-row items-center gap-s md:flex-col md:items-start">
                {!isVariant(MessageDisplayVariant.INLINE) && (
                    <div className={avatarClasses}>
                        <Link href={getRoute(APP_ROUTES.USER, message.creator.id)}>
                            <Avatar
                                // TODO: make size S on mobile
                                size={AvatarSize.M}
                                alt={`avatar from ${message.creator.username}`}
                                src={message.creator.avatarUrl}
                            />
                        </Link>
                    </div>
                )}
                <DisplayName
                    user={message.creator}
                    variant={displayNameVariant()}
                    postTimestamp={message.created}
                />
            </div>

            <div className="flex flex-col gap-s">
                <LinkWrapper
                    enabled={isVariant(MessageDisplayVariant.TIMELINE)}
                    route={getRoute(APP_ROUTES.POST, message.id)}
                >
                    {message.text && (
                        <Paragraph
                            className="text-secondary-900"
                            size={
                                isVariant(MessageDisplayVariant.DETAIL_VIEW)
                                    ? ParagraphSize.L
                                    : ParagraphSize.M
                            }
                        >
                            {message.text}
                        </Paragraph>
                    )}
                </LinkWrapper>
                {message.mediaUrl && (
                    <section className="relative h-auto w-full transition duration-500 md:h-[320px]">
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
            </div>

            <MessageActions message={message} displayVariant={displayVariant} />

            {isVariant(MessageDisplayVariant.DETAIL_VIEW) && children}
        </div>
    );
}
