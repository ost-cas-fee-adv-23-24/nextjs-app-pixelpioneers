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
    options?: Record<string, string[]>,
): string => `${route.replace('[id]', id)}${options ? getRouteOptions(options) : ''}`;

const getRouteOptions = (options: Record<string, string[]>): string => {
    let optionString = '?';
    Object.entries(options).map(([key, values]) => {
        // set a key for every value, since some keys allow to have multiple values
        values.map((value) => (optionString = `${optionString}${key}=${value}&`));
    });
    return optionString;
};
