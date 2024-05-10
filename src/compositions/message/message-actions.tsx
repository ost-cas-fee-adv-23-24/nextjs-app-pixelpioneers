'use client';
import { LikeType, Message } from '@/src/models/message.model';
import {
    CommentButton,
    LikeButton,
    ShareButton,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import React, { useEffect, useState } from 'react';
import { likePost } from '@/app/actions/message';
import { useRouter } from 'next/navigation';
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';
import { MessageDisplayVariant } from '@/src/compositions/message/types';
import { ActionResponse } from '@/src/models/action.model';
import { useSession } from 'next-auth/react';

type MessageActionsProps = { message: Message; displayVariant: MessageDisplayVariant };
export default function MessageActions({ message, displayVariant }: MessageActionsProps) {
    const router = useRouter();
    const { status } = useSession();
    const [fullUrl, setFullUrl] = useState<string>('');
    useEffect(() => {
        setFullUrl(
            `${window.location.host}${getRoute(
                APP_ROUTES.POST,
                displayVariant === MessageDisplayVariant.INLINE ? message.parentId : message.id,
            )}`,
        );
    }, [displayVariant, message]);

    return (
        <section className="ml-[-12px] flex flex-row justify-between md:justify-start md:gap-x-l">
            <CommentButton
                amount={message.replies}
                onClick={() =>
                    displayVariant !== MessageDisplayVariant.INLINE &&
                    router.push(getRoute(APP_ROUTES.POST, message.id))
                }
                data-testid="testCommentButton"
            />
            <LikeButton
                onClick={async () => {
                    if (status !== 'authenticated') {
                        router.push(getRoute(APP_ROUTES.LOGIN));
                    }

                    // TODO: set tags here already? also evaluate error
                    const response = JSON.parse(
                        await likePost(
                            message.id,
                            message.likedBySelf ? LikeType.UNLIKE : LikeType.LIKE,
                        ),
                    ) as ActionResponse<void>;
                    if (response.isError) {
                        // TODO: open error bubble
                    }
                }}
                isLiked={message.likedBySelf || false}
                amount={message.likes}
                data-testid="testLikeButton"
                className="btnLike"
            />
            <ShareButton
                label="Copy Link"
                labelShared="Link copied"
                link={fullUrl}
                disabled={fullUrl === ''}
            />
        </section>
    );
}
