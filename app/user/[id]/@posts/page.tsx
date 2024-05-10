import React from 'react';
import { getProfilePosts } from '@/app/actions/profile';
import ErrorPage from '@/src/compositions/error-page/error-page';
import { PAGINATION_LIMIT } from '@/src/models/paginate.model';
import ProfilePosts from '@/src/compositions/profile/profile-posts';
import ProfileRecommendations from '@/src/compositions/profile/profile-recommendations';
import { UserState } from '@/src/models/user.model';

export default async function UserPostsPage({ params }: { params: { id: string } }) {
    const userId = params.id;
    const profilePostResponse = await getProfilePosts(userId, {
        creators: [userId],
        limit: PAGINATION_LIMIT,
    });
    if (profilePostResponse.isError) {
        return (
            <ErrorPage
                errorMessage={profilePostResponse.error}
                errorTitle="Posts konnten nicht geladen werden."
                fullPage={false}
            />
        );
    }
    const { paginatedPosts, userState } = profilePostResponse.data;
    return paginatedPosts.data.length === 0 && userState === UserState.IS_ACTIVE_USER ? (
        <ProfileRecommendations userId={userId} />
    ) : (
        <ProfilePosts userState={userState} paginatedPosts={paginatedPosts} userId={userId} />
    );
}
