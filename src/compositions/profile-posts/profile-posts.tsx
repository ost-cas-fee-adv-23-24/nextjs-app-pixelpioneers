'use client';
import { User } from '@/src/models/user.model';
import React from 'react';
import ProfilePostTabs from '@/src/components/tabs-profile/profile-post-tabs';
import { Post } from '@/src/models/post.model';
import { PostVariant } from '@/src/compositions/post/types';
import { PaginatedResult } from '@/src/models/paginate.model';
import { useRouter } from 'next/navigation';
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';
import { ProfilePostType } from '@/src/models/profile.model';
import MessageContainer from '@/src/compositions/post/message-container';

type ProfilePostsProps = {
    user: User;
    paginatedPosts: PaginatedResult<Post>;
    activeUser?: boolean;
    postType: ProfilePostType;
};
export default function ProfilePosts({
    user,
    paginatedPosts,
    activeUser = false,
    postType,
}: ProfilePostsProps) {
    const router = useRouter();
    const likedPosts = postType === ProfilePostType.LIKED_BY;
    return (
        <>
            {activeUser && (
                <section className="flex flex-row justify-center md:justify-start">
                    <ProfilePostTabs
                        activeTabIndex={likedPosts ? 1 : 0}
                        onPosts={() =>
                            likedPosts && router.push(getRoute(APP_ROUTES.USER, user.id))
                        }
                        onLikes={() =>
                            !likedPosts && router.push(getRoute(APP_ROUTES.USER_LIKES, user.id))
                        }
                    />
                </section>
            )}
            <section className="flex flex-col gap-s">
                <MessageContainer messages={paginatedPosts.data} variant={PostVariant.TIMELINE} />
            </section>
        </>
    );
}
