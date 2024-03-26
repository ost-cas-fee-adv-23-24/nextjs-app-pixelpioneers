'use server';

import { checkIsActiveUser, getFollowees, getUser } from '@/app/actions/user';
import { getPosts } from '@/app/actions/post';
import { ProfileHeader, ProfilePosts, ProfilePostType } from '@/src/models/profile.model';
import { FollowingType } from '@/src/models/user.model';
import { userPostsHydrator } from '@/src/services/post.service';
import { redirect } from 'next/navigation';
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';

export async function getProfileHeader(userId: string): Promise<ProfileHeader> {
    const user = await getUser(userId);
    const { isActiveUser, user: activeUser } = await checkIsActiveUser(userId);
    let followedByActiveUser = FollowingType.NOT_LOGGED_IN;
    if (activeUser) {
        // TODO: check pagination here
        const paginatedFollowees = await getFollowees(activeUser.id);
        paginatedFollowees.data.find((follower) => follower.id === user.id)
            ? (followedByActiveUser = FollowingType.FOLLOWING)
            : (followedByActiveUser = FollowingType.NOT_FOLLOWING);
    }
    return {
        user,
        isActiveUser,
        followedByActiveUser,
    };
}

export async function getProfilePosts(
    userId: string,
    type: ProfilePostType,
): Promise<ProfilePosts> {
    const user = await getUser(userId);
    const { isActiveUser } = await checkIsActiveUser(userId);

    // redirect user to /posts, when attempting to see likes of other users
    if (!isActiveUser && type === ProfilePostType.LIKED_BY) {
        redirect(getRoute(APP_ROUTES.USER, userId));
    }

    const paginatedPosts = await getPosts(
        type === ProfilePostType.CREATED_BY ? { creators: [user.id] } : { likedBy: [user.id] },
    );

    return {
        user,
        isActiveUser,
        type,
        posts:
            type === ProfilePostType.CREATED_BY
                ? userPostsHydrator(paginatedPosts, user)
                : paginatedPosts,
    };
}
