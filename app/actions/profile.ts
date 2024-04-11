'use server';

import { checkIsActiveUser, getFollowees, getUser } from '@/app/actions/user';
import { getPosts } from '@/app/actions/post';
import { ProfileHeader, ProfilePosts, ProfilePostType } from '@/src/models/profile.model';
import { FollowingType } from '@/src/models/user.model';
import { userPostsHydrator } from '@/src/services/post.service';
import { redirect } from 'next/navigation';
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';
import { ActionResponse } from '@/src/models/action.model';
import { dataResponse } from '@/app/actions/utils';

export async function getProfileHeader(userId: string): Promise<ActionResponse<ProfileHeader>> {
    const userResponse = await getUser(userId);
    if (userResponse.isError) {
        return userResponse;
    }
    const user = userResponse.data;

    const { isActiveUser, user: activeUser } = await checkIsActiveUser(userId);
    let followedByActiveUser = FollowingType.NOT_LOGGED_IN;
    if (activeUser) {
        // TODO: check pagination here
        const followeesResponse = await getFollowees(activeUser.id);
        if (followeesResponse.isError) {
            return followeesResponse;
        }
        const paginatedFollowees = followeesResponse.data;

        paginatedFollowees.data.find((follower) => follower.id === user.id)
            ? (followedByActiveUser = FollowingType.FOLLOWING)
            : (followedByActiveUser = FollowingType.NOT_FOLLOWING);
    }
    return dataResponse({
        user,
        isActiveUser,
        followedByActiveUser,
    });
}

export async function getProfilePosts(
    userId: string,
    type: ProfilePostType,
): Promise<ActionResponse<ProfilePosts>> {
    const userResponse = await getUser(userId);
    if (userResponse.isError) {
        return userResponse;
    }
    const user = userResponse.data;

    const { isActiveUser } = await checkIsActiveUser(user.id);

    // redirect user to /posts, when attempting to see likes of other users
    if (!isActiveUser && type === ProfilePostType.LIKED_BY) {
        redirect(getRoute(APP_ROUTES.USER, userId));
    }

    const postsResponse = await getPosts(
        type === ProfilePostType.CREATED_BY
            ? { creators: [user.id], limit: 15 }
            : { likedBy: [user.id], limit: 15 },
    );
    if (postsResponse.isError) {
        return postsResponse;
    }
    const paginatedPosts = postsResponse.data;

    return dataResponse({
        user,
        isActiveUser,
        type,
        paginatedPosts:
            type === ProfilePostType.CREATED_BY
                ? userPostsHydrator(paginatedPosts, user)
                : paginatedPosts,
    });
}
