'use server';

import { checkIsActiveUser, getFollowees, getUser } from '@/app/actions/user';
import { getPosts } from '@/app/actions/message';
import { Profile, ProfileFollowing, ProfilePosts } from '@/src/models/profile.model';
import { User } from '@/src/models/user.model';
import { ActionResponse } from '@/src/models/action.model';
import { dataResponse } from '@/app/actions/utils';
import { PostFilterOptions } from '@/src/models/message.model';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

export async function getProfile(userId: string): Promise<ActionResponse<Profile>> {
    const userResponse = await getUser(userId);
    if (userResponse.isError) {
        return userResponse;
    }
    const user = userResponse.data;
    const userState = await checkIsActiveUser(userId);

    return dataResponse<Profile>({
        user,
        userState: userState,
    });
}

export async function getProfileFollowingStatus(
    userId: string,
): Promise<ActionResponse<ProfileFollowing>> {
    const session = await auth();
    const activeUserId = session?.user?.profile.sub;
    let isFollowing = false;

    if (!activeUserId) {
        return dataResponse<ProfileFollowing>({ isFollowing });
    }

    let followees: User[] = [];
    let nextRoute = true;
    const limit = 100;
    let offset = 0;

    while (nextRoute) {
        const followeesResponse = await getFollowees(activeUserId, { limit, offset });
        if (followeesResponse.isError) {
            return followeesResponse;
        }
        followees = [...followees, ...followeesResponse.data.data];
        nextRoute = !!followeesResponse.data.next;
        offset = offset + limit;
    }

    followees.find((follower) => follower.id === userId)
        ? (isFollowing = true)
        : (isFollowing = false);

    return dataResponse({ isFollowing });
}

export async function getProfilePosts(
    userId: string,
    postFilterOptions: PostFilterOptions,
): Promise<ActionResponse<ProfilePosts>> {
    const postsResponse = await getPosts(postFilterOptions);
    if (postsResponse.isError) {
        return postsResponse;
    }
    const paginatedPosts = postsResponse.data;

    return dataResponse<ProfilePosts>({
        userState: await checkIsActiveUser(userId),
        paginatedPosts,
    });
}
