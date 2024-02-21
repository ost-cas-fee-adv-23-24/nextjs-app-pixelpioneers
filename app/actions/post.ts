'use server';

import { Post, Reply } from '@/src/models/post.model';
import { postReducer, postsReducer, repliesReducer } from '@/src/services/post.service';
import { request } from '@/src/services/request.service';
import { API_ROUTES, getRoute } from '@/src/helpers/routes';
import { PaginatedResult } from '@/src/models/paginate.model';
import { getSession } from '@/app/actions/utils';
import { revalidateTag } from 'next/cache';
import { validatePostData } from '@/src/helpers/validator';
import { PostValidationError } from '@/src/models/error.model';

export async function likePost(postId: string): Promise<void> {
    const session = await getSession();
    await request<void>(
        getRoute(API_ROUTES.POSTS_ID_LIKES, postId),
        {
            method: 'PUT',
        },
        session.accessToken,
    );
    revalidateTag('posts');
}

export async function unlikePost(postId: string): Promise<void> {
    const session = await getSession();
    await request<void>(
        getRoute(API_ROUTES.POSTS_ID_LIKES, postId),
        {
            method: 'DELETE',
        },
        session.accessToken,
    );
    revalidateTag('posts');
}

export async function createPost(formData: FormData): Promise<Post> {
    const session = await getSession();
    const errors = validatePostData(formData);
    if (errors) {
        // TODO: ask about error handling, throw (with try/catch) or return (and instanceof)?
        throw new PostValidationError(errors);
    }

    const post = await request<Post>(
        getRoute(API_ROUTES.POSTS),
        {
            method: 'POST',
            body: formData,
        },
        session.accessToken,
    );
    revalidateTag('posts');
    return post;
}

export async function getPost(postId: string): Promise<Post> {
    return postReducer(
        await request<Post>(getRoute(API_ROUTES.POSTS_ID, postId), {
            method: 'GET',
        }),
    );
}

export async function deletePost(postId: string): Promise<void> {
    await request<void>(getRoute(API_ROUTES.POSTS_ID, postId), {
        method: 'DELETE',
    });
}

/**
 * get all Posts, pagination and filter possible by options param
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
        await request<PaginatedResult<Post>>(
            getRoute(API_ROUTES.POSTS, undefined, options),
            {
                method: 'GET',
            },
            undefined,
            ['posts'],
            15,
        ),
    );
}

export async function createReply(postId: string, formData: FormData): Promise<Reply> {
    const session = await getSession();
    const errors = validatePostData(formData);
    if (errors) {
        // TODO: ask about error handling, throw (with try/catch) or return (and instanceof)?
        throw new PostValidationError(errors);
    }

    const reply = await request<Reply>(
        getRoute(API_ROUTES.POSTS_ID_REPLIES, postId),
        {
            method: 'POST',
            body: formData,
        },
        session.accessToken,
    );
    revalidateTag('posts');
    revalidateTag(`replies-${postId}`);
    return reply;
}

/**
 * get all Replies from a certain Post, pagination possible by options param
 * The following options are available at the endpoint:
 * - offset; number as string
 * - limit; number as string
 * @param postId
 * @param options
 */
export async function getReplies(
    postId: string,
    options?: Record<string, string[]>,
): Promise<PaginatedResult<Reply>> {
    return repliesReducer(
        await request<PaginatedResult<Reply>>(
            getRoute(API_ROUTES.POSTS_ID_REPLIES, postId, options),
            {
                method: 'GET',
            },
            undefined,
            [`replies-${postId}`],
            15,
        ),
    );
}
