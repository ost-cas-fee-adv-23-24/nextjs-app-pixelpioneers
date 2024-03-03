'use server';

import { Post, PostWithReplies, Reply } from '@/src/models/post.model';
import {
    postReducer,
    postsReducer,
    postWithRepliesReducer,
    repliesReducer,
} from '@/src/services/post.service';
import { request } from '@/src/services/request.service';
import { API_ROUTES, getRoute } from '@/src/helpers/routes';
import { PaginatedResult } from '@/src/models/paginate.model';
import { getSession } from '@/app/actions/utils';
import { revalidateTag } from 'next/cache';
import { validatePostData } from '@/src/helpers/validator';
import { ValidationError } from '@/src/models/error.model';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

export async function likePost(postId: string): Promise<void> {
    const session = await getSession();
    await request(
        getRoute(API_ROUTES.POSTS_ID_LIKES, postId),
        {
            method: 'PUT',
        },
        session.accessToken,
    );
    // TODO: must be done in component, not server action
    revalidateTag('posts');
}

export async function unlikePost(postId: string): Promise<void> {
    const session = await getSession();
    await request(
        getRoute(API_ROUTES.POSTS_ID_LIKES, postId),
        {
            method: 'DELETE',
        },
        session.accessToken,
    );
    // TODO: must be done in component, not server action
    revalidateTag('posts');
}

export async function createPost(formData: FormData): Promise<Post> {
    const session = await getSession();
    const errors = validatePostData(formData);
    if (errors) {
        // TODO: ask about error handling, throw (with try/catch) or return (and instanceof)?
        throw new ValidationError(errors);
    }

    const post = (await request(
        getRoute(API_ROUTES.POSTS),
        {
            method: 'POST',
            body: formData,
        },
        session.accessToken,
    )) as Post;
    // TODO: must be done in component, not server action
    revalidateTag('posts');
    return post;
}

export async function getPost(postId: string): Promise<Post> {
    const session = await auth();
    return postReducer(
        (await request(
            getRoute(API_ROUTES.POSTS_ID, postId),
            {
                method: 'GET',
            },
            session?.accessToken,
            [`post-${postId}`],
        )) as Post,
    );
}

/** TODO: is needed?
 * get all Replies from a certain Post, pagination possible by options param
 * The following options are available at the endpoint:
 * - offset; number as string
 * - limit; number as string
 * @param postId
 * @param options
 */
export async function getPostWithReplies(
    postId: string,
    options?: Record<string, string[]>,
): Promise<PostWithReplies> {
    const post = await getPost(postId);
    const paginatedReplies = await getReplies(postId, options);
    return postWithRepliesReducer(post, paginatedReplies.data);
}

export async function deletePost(postId: string): Promise<void> {
    const session = await getSession();
    await request(
        getRoute(API_ROUTES.POSTS_ID, postId),
        {
            method: 'DELETE',
        },
        session.accessToken,
    );
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
    const session = await auth();
    return postsReducer(
        (await request(
            getRoute(API_ROUTES.POSTS, undefined, options),
            {
                method: 'GET',
            },
            session?.accessToken,
            ['posts'],
            15,
        )) as PaginatedResult<Post>,
    );
}

export async function createReply(postId: string, formData: FormData): Promise<Reply> {
    const session = await getSession();
    const errors = validatePostData(formData);
    if (errors) {
        // TODO: ask about error handling, throw (with try/catch) or return (and instanceof)?
        throw new ValidationError(errors);
    }

    return (await request(
        getRoute(API_ROUTES.POSTS_ID_REPLIES, postId),
        {
            method: 'POST',
            body: formData,
        },
        session.accessToken,
    )) as Reply;
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
    const session = await auth();
    return repliesReducer(
        (await request(
            getRoute(API_ROUTES.POSTS_ID_REPLIES, postId, options),
            {
                method: 'GET',
            },
            session?.accessToken,
            [`replies-${postId}`],
            15,
        )) as PaginatedResult<Reply>,
    );
}
