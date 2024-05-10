import type { Message } from '@/src/models/message.model';
import React, { ReactNode } from 'react';
import {
    AvatarSize,
    Paragraph,
    ParagraphSize,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import clsx from 'clsx';
import MessageActions from '@/src/compositions/message/message-actions';
import DisplayName from '@/src/compositions/display-name/display-name';
import { DisplayNameVariant } from '@/src/compositions/display-name/types';
import { MessageDisplayVariant } from '@/src/compositions/message/types';
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';
import Link from 'next/link';
import LinkWrapper from '@/src/components/link-wrapper/link-wrapper';
import Avatar from '@/src/components/avatar/avatar';
import MessageImage from '@/src/compositions/message/message-image';

type MessageProps = {
    message: Message;
    displayVariant: MessageDisplayVariant;
    children?: ReactNode;
};

export default function Message({ message, displayVariant, children }: MessageProps) {
    const user = message.creator;
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
        <div className={messageClasses} data-testid="testPostMessage">
            <div className="flex flex-row items-center gap-s md:flex-col md:items-start">
                {!isVariant(MessageDisplayVariant.INLINE) && (
                    <div className={avatarClasses}>
                        <Link href={getRoute(APP_ROUTES.USER, user.id)}>
                            <Avatar
                                desktopSize={AvatarSize.M}
                                mobileSize={AvatarSize.S}
                                avatarUrl={user.avatarUrl}
                                username={user.username}
                            />
                        </Link>
                    </div>
                )}
                <DisplayName
                    user={user}
                    variant={displayNameVariant()}
                    postTimestamp={message.created}
                />
            </div>

            <div className="flex flex-col gap-s">
                {message.text && (
                    <LinkWrapper
                        enabled={isVariant(MessageDisplayVariant.TIMELINE)}
                        route={getRoute(APP_ROUTES.POST, message.id)}
                    >
                        <Paragraph
                            className="break-all text-secondary-900"
                            size={
                                isVariant(MessageDisplayVariant.DETAIL_VIEW)
                                    ? ParagraphSize.L
                                    : ParagraphSize.M
                            }
                            data-testid="testPostData"
                        >
                            {message.text}
                        </Paragraph>
                    </LinkWrapper>
                )}
                {message.mediaUrl && (
                    <MessageImage
                        username={user.username}
                        imageUrl={message.mediaUrl}
                        imageType={message.mediaType}
                    />
                )}
            </div>

            <MessageActions message={message} displayVariant={displayVariant} />

            {isVariant(MessageDisplayVariant.DETAIL_VIEW) && children}
        </div>
    );
}
