import ProfilePosts from '@/src/compositions/profile-posts/profile-posts';
import React from 'react';
import { getProfilePosts } from '@/app/actions/profile';
import { ProfilePostType } from '@/src/models/profile.model';
import ErrorPage from '@/src/compositions/error-page/error-page';

export default async function UserPosts({ params }: { params: { id: string; postType: string } }) {
    const profilePostResponse = await getProfilePosts(
        params.id,
        params.postType === 'likes' ? ProfilePostType.LIKED_BY : ProfilePostType.CREATED_BY,
    );
    if (profilePostResponse.isError) {
        return (
            <ErrorPage
                errorMessage={profilePostResponse.error.message}
                errorTitle="Posts konnten nicht geladen werden."
                fullPage={false}
            />
        );
    }
    const { posts, user, isActiveUser, type } = profilePostResponse.data;
    return (
        <ProfilePosts
            user={user}
            paginatedPosts={posts}
            activeUser={isActiveUser}
            postType={type}
        />
    );
}
