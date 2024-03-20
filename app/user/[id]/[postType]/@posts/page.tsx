import ProfilePosts from '@/src/compositions/profile-posts/profile-posts';
import React from 'react';
import { getProfilePosts } from '@/app/actions/profile';
import { ProfilePostType } from '@/src/models/profile.model';

export default async function UserPosts({ params }: { params: { id: string; postType: string } }) {
    const { posts, user, isActiveUser, type } = await getProfilePosts(
        params.id,
        params.postType === 'likes' ? ProfilePostType.LIKED_BY : ProfilePostType.CREATED_BY,
    );
    if (!isActiveUser && params.postType === 'likes') {
        // TODO: clean solution
        //redirect(getRoute(APP_ROUTES.USER, params.id));
        return <div>Error: HTTP 403</div>;
    }
    return (
        <ProfilePosts
            user={user}
            paginatedPosts={posts}
            activeUser={isActiveUser}
            postType={type}
        />
    );
}
