import { FilterOptions } from '@/src/models/paginate.model';
import { PostFilterOptions } from '@/src/models/post.model';

export enum APP_ROUTES {
    POST = '/post/[id]',
    USER = '/user/[id]/posts',
    USER_LIKES = '/user/[id]/likes',
    // TODO: Followers, login & settings ?
    USER_FOLLOWERS = '/user/[id]/followers',
    SETTINGS = '/settings',
    LOGIN = '/login',
    MAIN = '/',
}

export enum API_ROUTES {
    POSTS = '/posts',
    POSTS_ID = '/posts/[id]',
    POSTS_ID_LIKES = '/posts/[id]/likes',
    POSTS_ID_REPLIES = '/posts/[id]/replies',
    // TODO: media used?
    POSTS_ID_MEDIA = '/posts/[id]/media',
    POSTS_REAL_TIME_DATA = '/posts/_sse',
    USERS_ID_FOLLOWERS = '/users/[id]/followers',
    USERS_ID_FOLLOWEES = '/users/[id]/followees',
    USERS = '/users',
    USERS_ID = '/users/[id]',
    USERS_AVATAR = '/posts/avatar',
}

export const getRoute = (
    route: APP_ROUTES | API_ROUTES,
    id = '',
    options?: Record<string, string[] | string | number>,
): string => `${route.replace('[id]', id)}${options ? getRouteOptions(options) : ''}`;

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

const getSingleOption = (option: string, params: URLSearchParams): string | undefined =>
    params.get(option) === null ? undefined : (params.get(option) as string);

export const getOptionsFromRoute = (params: URLSearchParams): FilterOptions => ({
    offset: Number.parseInt(getSingleOption('offset', params) || '0'),
    limit: Number.parseInt(getSingleOption('limit', params) || '0'),
});

export const getPostOptionsFromRoute = (params: URLSearchParams): PostFilterOptions => ({
    ...getOptionsFromRoute(params),
    newerThan: getSingleOption('newerThan', params),
    olderThan: getSingleOption('olderThan', params),
    text: getSingleOption('text', params),
    //tags:, creators:, likedBy:,
});
