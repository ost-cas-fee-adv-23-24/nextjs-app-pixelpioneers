import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { MessageDisplayVariant } from '@/src/compositions/message/types';

type MessageSkeletonProps = {
    displayVariant: MessageDisplayVariant;
    children?: ReactNode;
};

export default function MessageSkeleton({ displayVariant, children }: MessageSkeletonProps) {
    const isVariant = (variantToCheck: MessageDisplayVariant): boolean =>
        displayVariant === variantToCheck;

    const detailMessageClasses = clsx(
        'mx-0 w-full bg-secondary-300 px-m py-s', // mobile
        'md:w-container md:gap-m md:rounded-m md:px-xl md:pb-l', // desktop
    );
    const messageClasses = clsx(
        'relative flex animate-pulse flex-col gap-s',
        {
            inline: 'bg-secondary-100',
            timeline: detailMessageClasses,
            detailView: detailMessageClasses,
        }[displayVariant],
    );
    const avatarClasses = clsx(
        'z-5 relative row-span-3', // mobile
        'md:absolute md:left-[-32px] md:top-[20px]', // desktop
    );

    return (
        <div className={messageClasses} data-testid="testPostMessage">
            <div className="flex flex-row gap-s md:flex-col">
                <div className="flex flex-row items-center gap-s md:flex-col md:items-start">
                    {!isVariant(MessageDisplayVariant.INLINE) && (
                        <div className={avatarClasses}>
                            <div className="h-[40px] w-[40px] rounded-full bg-secondary-100 md:h-[64px] md:w-[64px] md:bg-secondary-300 md:ring-6 md:ring-secondary-100" />
                        </div>
                    )}
                </div>
                <div className="flex h-[24px] w-1/2 self-center rounded-s bg-secondary-100 md:self-start" />
            </div>

            <div className="flex h-[150px] rounded-s bg-secondary-100" />

            {isVariant(MessageDisplayVariant.DETAIL_VIEW) && children}
        </div>
    );
}
