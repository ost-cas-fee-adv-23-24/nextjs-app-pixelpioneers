'use client';
import { Post } from '@/src/models/post.model';
import {
    CommentButton,
    LikeButton,
    ShareButton,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import React from 'react';
import { likePost, unlikePost } from '@/app/actions/post';
import { useRouter } from 'next/navigation';
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';

type PostActionsProps = { post: Post; detailView?: boolean };
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
                onClick={async () =>
                    post.likedBySelf ? await unlikePost(post.id) : await likePost(post.id)
                }
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
