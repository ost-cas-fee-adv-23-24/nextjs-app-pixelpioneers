'use client';
import { Post } from '@/src/models/post.model';
import React from 'react';
import { LikeButton } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { likePost, unlikePost } from '@/app/actions';

export default function Post({ post }: { post: Post }) {
    return (
        <div className="border">
            {post.text && <p>{post.text}</p>}
            <div className="flex">
                <LikeButton
                    onClick={async () =>
                        post.likedBySelf ? await unlikePost(post.id) : await likePost(post.id)
                    }
                    isLiked={post.likedBySelf || false}
                    amount={post.likes}
                />
                <div>{post.replies} replies</div>
            </div>
        </div>
    );
}
