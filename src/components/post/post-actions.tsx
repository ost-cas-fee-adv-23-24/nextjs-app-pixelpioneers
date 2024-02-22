import { Post } from '@/src/models/post.model';
import {
    CommentButton,
    LikeButton,
    ShareButton,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import React from 'react';
import { likePost, unlikePost } from '@/app/actions/post';

export default function PostActions({ post }: { post: Post }) {
    return (
        <section className="ml-[-12px] flex flex-row justify-between md:justify-start md:gap-x-l">
            <CommentButton amount={post.replies} />
            <LikeButton
                // TODO: why does likedBy not work properly?
                onClick={async () =>
                    post.likedBySelf ? await unlikePost(post.id) : await likePost(post.id)
                }
                isLiked={post.likedBySelf || false}
                amount={post.likes}
            />
            <ShareButton label="Copy Link" labelShared="Link copied" link="https://www.denner.ch" />
        </section>
    );
}
