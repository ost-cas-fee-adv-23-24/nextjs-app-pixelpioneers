'use server';

import { PublicUser, User } from '@/src/models/user.model';
import { request } from '@/src/services/request.service';
import { API_ROUTES, getRoute } from '@/src/helpers/routes';
import { getSession } from '@/app/actions/utils';
import { PaginatedResult } from '@/src/models/paginate.model';
import { validateAvatarData } from '@/src/helpers/validator';
import { ValidationError } from '@/src/models/error.model';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

export async function getUser(userId: string): Promise<User | PublicUser> {
    const session = await auth();
    const user = await request(
        getRoute(API_ROUTES.USERS_ID, userId),
        {
            method: 'GET',
        },
        session?.accessToken,
    );
    if (session?.accessToken) {
        return user as User;
    }
    return user as PublicUser;
}

/**
 * get all Users, pagination possible by options param
 * The following options are available at the endpoint:
 * - offset; number as string
 * - limit; number as string
 * @param options
 */
export async function getUsers(
    options?: Record<string, string[]>,
): Promise<PaginatedResult<User | PublicUser>> {
    const session = await auth();
    const users = await request(
        getRoute(API_ROUTES.USERS, undefined, options),
        {
            method: 'GET',
        },
        session?.accessToken,
        ['users'],
        120,
    );

    if (session?.accessToken) {
        return users as PaginatedResult<User>;
    }
    return users as PaginatedResult<PublicUser>;
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
): Promise<PaginatedResult<PublicUser>> {
    const session = await auth();
    return (await request(
        getRoute(API_ROUTES.USERS_ID_FOLLOWERS, userId, options),
        {
            method: 'GET',
        },
        session?.accessToken,
        undefined,
        120,
    )) as PaginatedResult<PublicUser>;
}

export async function followUser(userId: string): Promise<void> {
    const session = await getSession();
    await request(
        getRoute(API_ROUTES.USERS_ID_FOLLOWERS, userId),
        { method: 'PUT' },
        session.accessToken,
    );
}

export async function unfollowUser(userId: string): Promise<void> {
    const session = await getSession();
    await request(
        getRoute(API_ROUTES.USERS_ID_FOLLOWERS, userId),
        { method: 'DELETE' },
        session.accessToken,
    );
}

export async function uploadAvatar(formData: FormData): Promise<void> {
    const session = await getSession();
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
    // TODO: we could use avatarUrl
}

export async function removeAvatar(): Promise<void> {
    const session = await getSession();
    await request(
        getRoute(API_ROUTES.USERS_AVATAR),
        {
            method: 'DELETE',
        },
        session.accessToken,
    );
}
