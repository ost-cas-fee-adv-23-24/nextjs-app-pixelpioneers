import { Session } from 'next-auth';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { redirect } from 'next/navigation';
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';
import { DataResponse, ErrorResponse } from '@/src/models/action.model';
import { User } from '@/src/models/user.model';
import { getUser } from '@/app/actions/user';

export async function getSession(): Promise<Session> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        redirect(getRoute(APP_ROUTES.LOGIN));
    }
    return session;
}

export async function getLoggedInUser(): Promise<User | undefined> {
    const session = await auth();
    const userId = session?.user?.profile.sub;
    let user = undefined;
    if (userId) {
        const userResponse = await getUser(userId);
        if (!userResponse.isError) {
            user = userResponse.data;
        }
    }
    return user;
}

export enum Tag {
    USER = 'user-[id]',
    USERS = 'users',
    FOLLOWERS = 'followers-[id]',
    FOLLOWEES = 'followees-[id]',
    POST = 'post-[id]',
    POSTS = 'posts',
    REPLIES = 'replies-[id]',
}

export function getTag(tag: Tag, id = ''): string {
    return tag.replace('[id]', id);
}

// TODO: simplify
export function errorResponse(error: Error | unknown, genericInfo: string): ErrorResponse {
    const errorObject =
        error instanceof Error
            ? error
            : {
                  name: genericInfo,
                  message: `an error occurred during ${genericInfo}`,
              };

    return {
        error: errorObject,
        isError: true,
    };
}

export function dataResponse<T>(data: T): DataResponse<T> {
    return { data, isError: false };
}
