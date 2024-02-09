export enum APP_ROUTES {
    POST = '/post/[id]',
    USER = '/user/[id]',
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
    POSTS_ID_MEDIA = '/posts/[id]/media',
    POSTS_ID_FOLLOWERS = '/users/[id]/followers',
    POSTS_REAL_TIME_DATA = '/posts/_sse',
    USERS = '/users',
    USERS_ID = '/users/[id]',
    USERS_AVATAR = '/posts/avatar',
}

export const getRoute = (route: APP_ROUTES | API_ROUTES, id = '') => route.replace('[id]', id);
