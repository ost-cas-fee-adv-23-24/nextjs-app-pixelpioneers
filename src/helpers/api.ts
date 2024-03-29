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

export function getPostEventSource() {
    return new EventSource(`${apiUrl}/posts/_sse`);
}
