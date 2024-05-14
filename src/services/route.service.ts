import { FilterOptions } from '@/src/models/message.model';

export enum APP_ROUTES {
    POST = '/post/[id]',
    USER = '/user/[id]',
    LOGIN = '/login',
    HOME = '/',
}

export enum API_ROUTES {
    POSTS = '/posts',
    POSTS_ID = '/posts/[id]',
    POSTS_ID_LIKES = '/posts/[id]/likes',
    POSTS_ID_REPLIES = '/posts/[id]/replies',
    POSTS_REAL_TIME_DATA = '/posts/_sse',
    USERS_ID_FOLLOWERS = '/users/[id]/followers',
    USERS_ID_FOLLOWEES = '/users/[id]/followees',
    USERS = '/users',
    USERS_ID = '/users/[id]',
    USERS_AVATAR = '/users/avatar',
}

export const getRoute = (
    route: APP_ROUTES | API_ROUTES,
    id = '',
    options?: FilterOptions,
): string => `${route.replace('[id]', id)}${options ? getRouteOptions(options) : ''}`;

export enum Tag {
    USER = 'user-[id]',
    USERS = 'users',
    FOLLOWERS = 'followers-[id]',
    FOLLOWEES = 'followees-[id]',
    POST = 'post-[id]',
    POSTS = 'posts',
    REPLIES = 'replies-[id]',
}

export function getTag(tag: Tag, id = '', options?: FilterOptions): string {
    return `${tag.replace('[id]', id)}${options ? getRouteOptions(options) : ''}`;
}

const getRouteOptions = (options: Record<string, string[] | string | number>): string => {
    let optionString = '?';
    const expandOptions = (key: string, value: string) => {
        optionString = `${optionString}${key}=${value}&`;
    };

    Object.entries(options).map(([key, values]) => {
        switch (typeof values) {
            case 'string':
                expandOptions(key, values);
                break;
            case 'number':
                expandOptions(key, values.toString());
                break;
            default: // string array
                // set a key for every value, since some keys allow to have multiple values
                (values as string[]).map((value) => expandOptions(key, value));
        }
    });
    return optionString;
};

export enum PostEvent {
    CREATED = 'postCreated',
}

export function getPostEventSource() {
    return new EventSource(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${API_ROUTES.POSTS_REAL_TIME_DATA}`,
    );
}
