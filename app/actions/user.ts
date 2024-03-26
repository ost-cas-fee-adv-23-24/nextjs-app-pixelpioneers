'use server';

import { FollowType, User } from '@/src/models/user.model';
import { request } from '@/src/services/request.service';
import { API_ROUTES, getRoute } from '@/src/helpers/routes';
import { getSession, getTag, Tag } from '@/app/actions/utils';
import { PaginatedResult } from '@/src/models/paginate.model';
import { validateAvatarData } from '@/src/helpers/validator';
import { ValidationError } from '@/src/models/error.model';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { revalidateTag } from 'next/cache';

export async function getUser(userId: string): Promise<User> {
    // TODO: useful to get session in every server action?
    const session = await auth();
    return (await request(
        getRoute(API_ROUTES.USERS_ID, userId),
        {
            method: 'GET',
        },
        session?.accessToken,
        [getTag(Tag.USER, userId)],
        120,
    )) as User;
}

/**
 * get all Users, pagination possible by options param
 * The following options are available at the endpoint:
 * - offset; number as string
 * - limit; number as string
 * @param options
 */
export async function getUsers(options?: Record<string, string[]>): Promise<PaginatedResult<User>> {
    const session = await auth();
    return (await request(
        getRoute(API_ROUTES.USERS, undefined, options),
        {
            method: 'GET',
        },
        session?.accessToken,
        [getTag(Tag.USERS)],
        120,
    )) as PaginatedResult<User>;
}

/**
 * get all followers of a User, pagination possible by options param
 * The following options are available at the endpoint:
 * - offset; number as string
 * - limit; number as string
 * @param userId
 * @param options
 */
export async function getFollowers(
    userId: string,
    options?: Record<string, string[]>,
): Promise<PaginatedResult<User>> {
    const session = await auth();
    return (await request(
        getRoute(API_ROUTES.USERS_ID_FOLLOWERS, userId, options),
        {
            method: 'GET',
        },
        session?.accessToken,
        [getTag(Tag.FOLLOWERS, userId)],
        120,
    )) as PaginatedResult<User>;
}

/**
 * get all followees of a User, pagination possible by options param
 * The following options are available at the endpoint:
 * - offset; number as string
 * - limit; number as string
 * @param userId
 * @param options
 */
export async function getFollowees(
    userId: string,
    options?: Record<string, string[]>,
): Promise<PaginatedResult<User>> {
    const session = await auth();
    return (await request(
        getRoute(API_ROUTES.USERS_ID_FOLLOWEES, userId, options),
        {
            method: 'GET',
        },
        session?.accessToken,
        [getTag(Tag.FOLLOWEES, userId)],
        120,
    )) as PaginatedResult<User>;
}

export async function followUser(userId: string, followType: FollowType): Promise<void> {
    const session = await getSession();
    const activeUserId = session.user?.id;
    await request(
        getRoute(API_ROUTES.USERS_ID_FOLLOWERS, userId),
        { method: followType === FollowType.FOLLOW ? 'PUT' : 'DELETE' },
        session.accessToken,
    );
    activeUserId && revalidateTag(getTag(Tag.FOLLOWEES, activeUserId));
    revalidateTag(getTag(Tag.FOLLOWERS, userId));
}

export async function uploadAvatar(formData: FormData): Promise<void> {
    const session = await getSession();
    const activeUserId = session.user?.id;
    const errors = validateAvatarData(formData);
    if (errors) {
        throw new ValidationError(errors);
    }
    await request(
        getRoute(API_ROUTES.USERS_AVATAR),
        {
            method: 'PUT',
            body: formData,
        },
        session.accessToken,
    );
    activeUserId && revalidateTag(getTag(Tag.USER, activeUserId));
}

export async function removeAvatar(): Promise<void> {
    const session = await getSession();
    const activeUserId = session.user?.id;
    await request(
        getRoute(API_ROUTES.USERS_AVATAR),
        {
            method: 'DELETE',
        },
        session.accessToken,
    );
    activeUserId && revalidateTag(getTag(Tag.USER, activeUserId));
}

export async function checkIsActiveUser(
    userId: string,
): Promise<{ isActiveUser: boolean; user?: User }> {
    const session = await auth();
    if (session?.user?.id) {
        const activeUser = await getUser(session.user.id);
        return { isActiveUser: activeUser.id === userId, user: activeUser };
    }
    // return false when no session available
    return { isActiveUser: false };
}
