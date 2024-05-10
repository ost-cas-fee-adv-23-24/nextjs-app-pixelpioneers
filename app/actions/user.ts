'use server';

import { User, UserState } from '@/src/models/user.model';
import { request } from '@/src/services/request.service';
import { API_ROUTES, getRoute, getTag, Tag } from '@/src/helpers/routes';
import { dataResponse, errorResponse } from '@/app/actions/utils';
import { PaginatedResult, PAGINATION_LIMIT, PaginationOptions } from '@/src/models/paginate.model';
import { validateAvatarData } from '@/src/helpers/validator';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { revalidateTag } from 'next/cache';
import { ActionResponse, ErrorType, RevalidationTime } from '@/src/models/action.model';

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
            RevalidationTime.LONG,
        )) as User;
        return dataResponse(user);
    } catch (error) {
        return errorResponse(ErrorType.FETCH);
    }
}

/**
 * get all Users, pagination possible by options param
 * @param options
 */
export async function getUsers(
    options?: PaginationOptions,
): Promise<ActionResponse<PaginatedResult<User>>> {
    const session = await auth();
    try {
        const paginatedUsers = (await request(
            getRoute(API_ROUTES.USERS, undefined, options),
            {
                method: 'GET',
            },
            session?.accessToken,
            [getTag(Tag.USERS, undefined, options)],
            RevalidationTime.LONG,
        )) as PaginatedResult<User>;
        return dataResponse(paginatedUsers);
    } catch (error) {
        return errorResponse(ErrorType.FETCH);
    }
}

/**
 * get all followers of a User, pagination possible by options param
 * @param userId
 * @param options
 */
export async function getFollowers(
    userId: string,
    options?: PaginationOptions,
): Promise<ActionResponse<PaginatedResult<User>>> {
    const session = await auth();
    try {
        const paginatedFollowers = (await request(
            getRoute(API_ROUTES.USERS_ID_FOLLOWERS, userId, options),
            {
                method: 'GET',
            },
            session?.accessToken,
            [getTag(Tag.FOLLOWERS, userId, options)],
            RevalidationTime.LONG,
        )) as PaginatedResult<User>;
        return dataResponse(paginatedFollowers);
    } catch (error) {
        return errorResponse(ErrorType.FETCH);
    }
}

/**
 * get all followees of a User, pagination possible by options param
 * @param userId
 * @param options
 */
export async function getFollowees(
    userId: string,
    options?: PaginationOptions,
): Promise<ActionResponse<PaginatedResult<User>>> {
    const session = await auth();
    try {
        const paginatedFollowees = (await request(
            getRoute(API_ROUTES.USERS_ID_FOLLOWEES, userId, options),
            {
                method: 'GET',
            },
            session?.accessToken,
            [getTag(Tag.FOLLOWEES, userId, options)],
            RevalidationTime.LONG,
        )) as PaginatedResult<User>;
        return dataResponse(paginatedFollowees);
    } catch (error) {
        return errorResponse(ErrorType.FETCH);
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
        return JSON.stringify(errorResponse(ErrorType.EXECUTION));
    }
    const isFollowing = new RegExp('true').test(isFollowingString);

    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        return JSON.stringify(errorResponse(ErrorType.AUTHORIZATION));
    }

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
        return JSON.stringify(errorResponse(ErrorType.EXECUTION));
    }
}

export async function uploadAvatar(formData: FormData): Promise<ActionResponse<void>> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        return errorResponse(ErrorType.AUTHORIZATION);
    }
    const activeUserId = session.user?.profile.sub;
    try {
        validateAvatarData(formData);
    } catch (error) {
        return errorResponse(ErrorType.VALIDATION);
    }

    try {
        await request(
            getRoute(API_ROUTES.USERS_AVATAR),
            {
                method: 'PUT',
                body: formData,
            },
            session.accessToken,
            undefined,
            undefined,
            true,
        );
        if (activeUserId) {
            revalidateTag(getTag(Tag.USER, activeUserId));
            revalidateTag(
                getTag(Tag.POSTS, undefined, {
                    creators: [activeUserId],
                    limit: PAGINATION_LIMIT,
                }),
            );
            revalidateTag(
                getTag(Tag.POSTS, undefined, {
                    limit: PAGINATION_LIMIT,
                }),
            );
        }
        return dataResponse(undefined);
    } catch (error) {
        return errorResponse(ErrorType.EXECUTION);
    }
}

// TODO: use
export async function removeAvatar(): Promise<ActionResponse<void>> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        return errorResponse(ErrorType.AUTHORIZATION);
    }
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
        return errorResponse(ErrorType.EXECUTION);
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
