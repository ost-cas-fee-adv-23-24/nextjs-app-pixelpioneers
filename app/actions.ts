'use server';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { redirectToLogin } from '@/src/helpers/checkLogin';
import { API_ROUTES, getRoute } from '@/src/helpers/routes';
import { CreatePostSchema, Post } from '@/src/models/post.model';
import { request } from '@/src/services/request.service';
import { User } from '@/src/models/user.model';
import { ActionError } from '@/src/models/fetch.model';
import { PaginatedResult } from '@/src/models/paginate.model';
import { postReducer, postsReducer } from '@/src/services/post.service';

const loginError: Record<string, string> = { login: 'session outdated' };

export async function likePost(postId: string): Promise<void> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        redirectToLogin();
        throw new ActionError(loginError);
    }
    return await request<void>(
        getRoute(API_ROUTES.POSTS_ID_LIKES, postId),
        {
            method: 'PUT',
        },
        session.accessToken,
    );
    //revalidateTag('posts') // Update cached posts
}

export async function unlikePost(postId: string): Promise<void> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        redirectToLogin();
        throw new ActionError(loginError);
    }
    return await request<void>(
        getRoute(API_ROUTES.POSTS_ID_LIKES, postId),
        {
            method: 'DELETE',
        },
        session.accessToken,
    );
    //revalidateTag('posts') // Update cached posts
}

export async function createPost(formData: FormData): Promise<Post> {
    // TODO: cleanest way?
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        redirectToLogin();
        throw new ActionError(loginError);
    }
    const validatedFields = CreatePostSchema.safeParse({
        text: formData.get('text'),
        media: formData.get('media'),
    });

    if (!validatedFields.success) {
        throw new ActionError(validatedFields.error.flatten().fieldErrors);
    }

    return await request<Post>(
        getRoute(API_ROUTES.POSTS),
        {
            method: 'POST',
            body: formData,
        },
        session.accessToken,
    );
}

export async function getPost(postId: string): Promise<Post> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        redirectToLogin();
        throw new ActionError(loginError);
    }

    return postReducer(
        await request<Post>(getRoute(API_ROUTES.POSTS_ID, postId), {
            method: 'GET',
        }),
    );
}

/**
 * get all Posts, filter possible by options param
 * The following options are available at the endpoint:
 * - newerThan: post ULID; string
 * - olderThan: post ULID; string
 * - text: text to search for; string
 * - tags: tag to search for, multiple records possible; string
 * - creators: creator ID to filter for, multiple records possible; string
 * - likedBy: user ID who liked the post to filter for, multiple records possible; string
 * - offset; number as string
 * - limit; number as string
 * @param options
 */
export async function getPosts(options?: Record<string, string[]>): Promise<PaginatedResult<Post>> {
    return postsReducer(
        await request<PaginatedResult<Post>>(getRoute(API_ROUTES.POSTS, undefined, options), {
            method: 'GET',
        }),
    );
}

export async function getUser(userId: string): Promise<User> {
    const session = await auth();

    if (session === null || session.accessToken === undefined) {
        redirectToLogin();
        throw new ActionError(loginError);
    }

    return await request<User>(
        getRoute(API_ROUTES.USERS_ID, userId),
        {
            method: 'GET',
        },
        session.accessToken,
    );
}
