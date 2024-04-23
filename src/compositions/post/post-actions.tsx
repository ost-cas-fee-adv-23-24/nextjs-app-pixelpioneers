'use client';
import { LikeType, Message } from '@/src/models/post.model';
import {
    CommentButton,
    LikeButton,
    ShareButton,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import React from 'react';
import { likePost } from '@/app/actions/post';
import { useRouter } from 'next/navigation';
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';

type PostActionsProps = { post: Message; detailView?: boolean };
export default function PostActions({ post, detailView }: PostActionsProps) {
    const router = useRouter();
    return (
        <section className="ml-[-12px] flex flex-row justify-between md:justify-start md:gap-x-l">
            <CommentButton
                amount={post.replies}
                onClick={() => router.push(getRoute(APP_ROUTES.POST, post.id))}
                disabled={detailView}
            />
            <LikeButton
                // TODO: fix on side of design system
                key={post.id}
                onClick={async () => {
                    // TODO: set tags here already? also evaluate error
                    const response = await likePost(
                        post.id,
                        post.likedBySelf ? LikeType.UNLIKE : LikeType.LIKE,
                    );
                    if (response.isError) {
                        console.error(response.error.message);
                    }
                }}
                isLiked={post.likedBySelf || false}
                amount={post.likes}
            />
            {/* TODO: get full URL */}
            <ShareButton
                label="Copy Link"
                labelShared="Link copied"
                link={getRoute(APP_ROUTES.POST, post.id)}
            />
        </section>
    );
}
