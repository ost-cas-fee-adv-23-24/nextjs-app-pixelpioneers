import ProfilePosts from '@/src/compositions/profile-posts/profile-posts';
import React, { Suspense } from 'react';
import { getProfilePosts } from '@/app/actions/profile';
import { ProfilePostType } from '@/src/models/profile.model';
import LoadingPost from './loading';

export default async function UserPosts({ params }: { params: { id: string; postType: string } }) {
    const { posts, user, isActiveUser, type } = await getProfilePosts(
        params.id,
        params.postType === 'likes' ? ProfilePostType.LIKED_BY : ProfilePostType.CREATED_BY,
    );

    return (
        <Suspense fallback={<LoadingPost />}>
            <ProfilePosts
                user={user}
                paginatedPosts={posts}
                activeUser={isActiveUser}
                postType={type}
            />
        </Suspense>
    );
}
