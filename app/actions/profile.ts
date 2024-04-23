'use server';

import { checkIsActiveUser, getFollowees, getUser } from '@/app/actions/user';
import { getPosts } from '@/app/actions/post';
import { ProfileHeader, ProfilePosts } from '@/src/models/profile.model';
import { FollowingType } from '@/src/models/user.model';
import { ActionResponse } from '@/src/models/action.model';
import { dataResponse } from '@/app/actions/utils';
import { PostFilterOptions } from '@/src/models/message.model';

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
    postFilterOptions: PostFilterOptions,
): Promise<ActionResponse<ProfilePosts>> {
    const userResponse = await getUser(userId);
    if (userResponse.isError) {
        return userResponse;
    }
    const user = userResponse.data;

    const { isActiveUser } = await checkIsActiveUser(user.id);

    const postsResponse = await getPosts(postFilterOptions);
    if (postsResponse.isError) {
        return postsResponse;
    }
    const paginatedPosts = postsResponse.data;

    return dataResponse({
        user,
        isActiveUser,
        paginatedPosts,
    });
}
