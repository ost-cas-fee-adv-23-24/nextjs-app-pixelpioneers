'use server';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { redirectToLogin } from '@/src/helpers/checkLogin';
import { API_ROUTES, getRoute } from '@/src/helpers/routes';
import { CreatePostSchema, Post } from '@/src/models/post.model';
import { request } from '@/src/services/request.service';
import { User } from '@/src/models/user.model';
import {
    ActionError,
    CreatePostError,
    LoginError,
    RequestError,
    Response,
} from '@/src/models/fetch.model';
import { postReducer, postsReducer } from '@/src/services/post.service';

const loginError: LoginError = { login: 'session outdated' };

export async function likePost(postId: string): Promise<void | ActionError> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        redirectToLogin();
        return loginError;
    }
    const response = await request<void>(
        getRoute(API_ROUTES.POSTS_ID_LIKES, postId),
        {
            method: 'PUT',
        },
        session.accessToken,
    );
    //revalidateTag('posts') // Update cached posts
    return resolveEmptyResponse(response, 'like post failed');
}

export async function unlikePost(postId: string): Promise<void | ActionError> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        redirectToLogin();
        return loginError;
    }
    const response = await request<void>(
        getRoute(API_ROUTES.POSTS_ID_LIKES, postId),
        {
            method: 'DELETE',
        },
        session.accessToken,
    );
    //revalidateTag('posts') // Update cached posts
    return resolveEmptyResponse(response, 'unlike post failed');
}

export async function createPost(formData: FormData): Promise<Post | CreatePostError> {
    // TODO: cleanest way?
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        redirectToLogin();
        return loginError;
    }
    const validatedFields = CreatePostSchema.safeParse({
        text: formData.get('text'),
        media: formData.get('media'),
    });

    if (!validatedFields.success) {
        return validatedFields.error.flatten().fieldErrors;
    }

    const response = await request<Post>(
        getRoute(API_ROUTES.POSTS),
        {
            method: 'POST',
            body: formData,
        },
        session.accessToken,
    );

    return resolveResponse<Post>(response, 'post not uploaded');
}

export async function getPost(postId: string): Promise<Post | ActionError> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        redirectToLogin();
        return loginError;
    }

    const response = await request<Post>(getRoute(API_ROUTES.POSTS_ID, postId), {
        method: 'GET',
    });

    return resolveResponse<Post>(response, 'post not found', postReducer);
}

export async function getPosts(
    newerThanId?: string,
    olderThanId?: string,
    searchText?: string,
    tags?: string[],
    creatorIds?: string[],
    likedByUserId?: string[],
    offset?: number,
    limit?: number,
): Promise<Post[] | ActionError> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        redirectToLogin();
        return loginError;
    }

    console.info(
        newerThanId,
        olderThanId,
        searchText,
        tags,
        creatorIds,
        likedByUserId,
        offset,
        limit,
    );
    const response = await request<Post[]>(getRoute(API_ROUTES.POSTS, undefined, {}), {
        method: 'GET',
    });

    return resolveResponse<Post[]>(response, 'post not found', postsReducer);
}

export async function getUser(userId: string): Promise<User | ActionError> {
    const session = await auth();

    if (session === null || session.accessToken === undefined) {
        redirectToLogin();
        return loginError;
    }

    const response = await request<User>(
        getRoute(API_ROUTES.USERS_ID, userId),
        {
            method: 'GET',
        },
        session.accessToken,
    );

    return resolveResponse<User>(response, 'user not found');
}

function resolveResponse<T>(
    response: Response<T>,
    errorMessage?: string,
    reducer?: (object: T) => T,
): T | RequestError {
    if (!response.data) {
        return response.error || { request: errorMessage || 'error' };
    }
    if (reducer) {
        return reducer(response.data);
    }
    return response.data;
}

function resolveEmptyResponse(
    response: Response<void>,
    errorMessage?: string,
): RequestError | void {
    if (response.error) {
        return response.error || { request: errorMessage || 'error' };
    }
    return;
}
