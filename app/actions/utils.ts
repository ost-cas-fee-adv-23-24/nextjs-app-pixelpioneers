import { Session } from 'next-auth';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { redirect } from 'next/navigation';
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';

export async function getSession(): Promise<Session> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        redirect(getRoute(APP_ROUTES.LOGIN));
    }
    return session;
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
