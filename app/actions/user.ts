'use server';

import { User, UserState } from '@/src/models/user.model';
import { request } from '@/src/services/request.service';
import { API_ROUTES, getRoute } from '@/src/helpers/routes';
import { dataResponse, errorResponse, getSession, getTag, Tag } from '@/app/actions/utils';
import { FilterOptions, PaginatedResult } from '@/src/models/paginate.model';
import { validateAvatarData } from '@/src/helpers/validator';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { revalidateTag } from 'next/cache';
import { ActionResponse, RevalidationTime } from '@/src/models/action.model';

export async function getUser(userId: string): Promise<ActionResponse<User>> {
    const session = await auth();
    try {
        const user = (await request(
            getRoute(API_ROUTES.USERS_ID, userId),
            {
                method: 'GET',
            },
            session?.accessToken,
            [getTag(Tag.USER, userId)],
            RevalidationTime.MEDIUM,
        )) as User;
        return dataResponse(user);
    } catch (error) {
        return errorResponse(error, 'get user');
    }
}

/**
 * get all Users, pagination possible by options param
 * @param options
 */
// TODO: use
export async function getUsers(
    options?: FilterOptions,
): Promise<ActionResponse<PaginatedResult<User>>> {
    const session = await auth();
    try {
        const paginatedUsers = (await request(
            getRoute(API_ROUTES.USERS, undefined, options),
            {
                method: 'GET',
            },
            session?.accessToken,
            [getTag(Tag.USERS)],
            RevalidationTime.LONG,
        )) as PaginatedResult<User>;
        return dataResponse(paginatedUsers);
    } catch (error) {
        return errorResponse(error, 'get users');
    }
}

/**
 * get all followers of a User, pagination possible by options param
 * @param userId
 * @param options
 */
// TODO: use or remove
export async function getFollowers(
    userId: string,
    options?: FilterOptions,
): Promise<ActionResponse<PaginatedResult<User>>> {
    const session = await auth();
    try {
        const paginatedFollowers = (await request(
            getRoute(API_ROUTES.USERS_ID_FOLLOWERS, userId, options),
            {
                method: 'GET',
            },
            session?.accessToken,
            [getTag(Tag.FOLLOWERS, userId)],
            RevalidationTime.LONG,
        )) as PaginatedResult<User>;
        return dataResponse(paginatedFollowers);
    } catch (error) {
        return errorResponse(error, 'get followers');
    }
}

/**
 * get all followees of a User, pagination possible by options param
 * @param userId
 * @param options
 */
export async function getFollowees(
    userId: string,
    options?: FilterOptions,
): Promise<ActionResponse<PaginatedResult<User>>> {
    const session = await auth();
    try {
        const paginatedFollowees = (await request(
            getRoute(API_ROUTES.USERS_ID_FOLLOWEES, userId, options),
            {
                method: 'GET',
            },
            session?.accessToken,
            [getTag(Tag.FOLLOWEES, userId)],
            RevalidationTime.LONG,
        )) as PaginatedResult<User>;
        return dataResponse(paginatedFollowees);
    } catch (error) {
        return errorResponse(error, 'get followees');
    }
}

export async function followUser(formData: FormData): Promise<string> {
    const userId = formData.get('userId');
    const isFollowingString = formData.get('isFollowing');

    if (
        typeof userId !== 'string' ||
        typeof isFollowingString !== 'string' ||
        !['true', 'false'].includes(isFollowingString)
    ) {
        // TODO: stringify or Next Response?
        return JSON.stringify(errorResponse(new Error('bad request'), 'follow user'));
    }
    const isFollowing = new RegExp('true').test(isFollowingString);

    const session = await getSession();
    const activeUserId = session.user?.profile.sub;

    try {
        await request(
            getRoute(API_ROUTES.USERS_ID_FOLLOWERS, userId),
            { method: isFollowing ? 'DELETE' : 'PUT' },
            session.accessToken,
        );
        activeUserId && revalidateTag(getTag(Tag.FOLLOWEES, activeUserId));
        revalidateTag(getTag(Tag.FOLLOWERS, userId));
        return JSON.stringify(dataResponse(undefined));
    } catch (error) {
        return JSON.stringify(errorResponse(error, `${isFollowing ? 'un' : ''}follow user`));
    }
}

// TODO: use
export async function uploadAvatar(formData: FormData): Promise<ActionResponse<void>> {
    const session = await getSession();
    const activeUserId = session.user?.profile.sub;
    try {
        validateAvatarData(formData);
    } catch (error) {
        return errorResponse(error, 'validate avatar data');
    }

    try {
        await request(
            getRoute(API_ROUTES.USERS_AVATAR),
            {
                method: 'PUT',
                body: formData,
            },
            session.accessToken,
        );
        activeUserId && revalidateTag(getTag(Tag.USER, activeUserId));
        return dataResponse(undefined);
    } catch (error) {
        return errorResponse(error, 'upload avatar');
    }
}

// TODO: use
export async function removeAvatar(): Promise<ActionResponse<void>> {
    const session = await getSession();
    const activeUserId = session.user?.profile.sub;
    try {
        await request(
            getRoute(API_ROUTES.USERS_AVATAR),
            {
                method: 'DELETE',
            },
            session.accessToken,
        );
        activeUserId && revalidateTag(getTag(Tag.USER, activeUserId));
        return dataResponse(undefined);
    } catch (error) {
        return errorResponse(error, 'upload avatar');
    }
}

export async function checkIsActiveUser(userId: string): Promise<UserState> {
    const session = await auth();

    if (!session?.user?.profile.sub) {
        return UserState.LOGGED_OUT;
    }

    const activeUserResponse = await getUser(session.user.profile.sub);
    if (activeUserResponse.isError) {
        return UserState.LOGGED_IN;
    }
    const activeUser = activeUserResponse.data;
    return activeUser.id === userId ? UserState.IS_ACTIVE_USER : UserState.LOGGED_IN;
}
