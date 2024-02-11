'use server';

import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { redirectToLogin } from '@/src/helpers/checkLogin';
import { API_ROUTES, getRoute } from '@/src/helpers/routes';
import { CreatePostSchema, Post } from '@/src/models/post.model';
import { request } from '@/src/services/request.service';
import { ActionError, CreatePostError, LoginError } from '@/src/models/fetch.model';

const loginError: LoginError = { login: 'session outdated' };

export async function likePost(postId: string): Promise<void | ActionError> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        redirectToLogin();
        return loginError;
    }
    const response = await request<void>(
        getRoute(API_ROUTES.POSTS_ID_LIKES, postId),
        session.accessToken,
        {
            method: 'PUT',
        },
    );
    if (response.error) {
        return response.error;
    }

    //revalidateTag('posts') // Update cached posts
}

export async function unlikePost(postId: string): Promise<void | ActionError> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        redirectToLogin();
        return loginError;
    }
    const response = await request<void>(
        getRoute(API_ROUTES.POSTS_ID_LIKES, postId),
        session.accessToken,
        {
            method: 'DELETE',
        },
    );
    if (response.error) {
        return response.error;
    }

    //revalidateTag('posts') // Update cached posts
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

    const response = await request<Post>(getRoute(API_ROUTES.POSTS), session.accessToken, {
        method: 'POST',
        body: formData,
    });

    if (!response.data) {
        return response.error || { request: 'post not found' };
    }

    return response.data;
}
