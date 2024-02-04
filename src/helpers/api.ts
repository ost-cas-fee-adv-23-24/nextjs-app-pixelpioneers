export const apiUrl = 'https://mumble-api-prod-4cxdci3drq-oa.a.run.app';

export function authHeader(accessToken?: string): HeadersInit {
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

// TODO: Clean up
export enum PostEvents {
    created = 'postCreated',
    updated = 'postUpdated',
    deleted = 'postDeleted',
    liked = 'postLiked',
    unliked = 'postUnliked',
}

export enum API_POSTS_ROUTES {
    POSTS = '/posts',
    POSTS_ID = '/posts/:id',
    POSTS_ID_LIKES = '/posts/:id/likes',
    POSTS_ID_REPLIES = '/posts/:id/replies',
    POSTS_ID_MEDIA = '/posts/:id/media',
    POSTS_REAL_TIME_DATA = '/posts/_sse',
}

export enum API_USERS_ROUTES {
    USERS = '/users',
    USERS_ID = '/users/:id',
    USERS_AVATAR = '/posts/avatar',
    POSTS_ID_FOLLOWERS = '/users/:id/followers',
}

export function getPostEventSource() {
    return new EventSource(`${apiUrl}/posts/_sse`);
}
