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
    revalidateTag('posts');
    return post;
}

async function getPost(postId: string): Promise<Post> {
    return postReducer(
        (await request(
            getRoute(API_ROUTES.POSTS_ID, postId),
            {
                method: 'GET',
            },
            undefined,
            [`post-${postId}`],
        )) as Post,
    );
}

/**
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
    await request(getRoute(API_ROUTES.POSTS_ID, postId), {
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

    const reply = (await request(
        getRoute(API_ROUTES.POSTS_ID_REPLIES, postId),
        {
            method: 'POST',
            body: formData,
        },
        session.accessToken,
    )) as Reply;
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
async function getReplies(
    postId: string,
    options?: Record<string, string[]>,
): Promise<PaginatedResult<Reply>> {
    return repliesReducer(
        (await request(
            getRoute(API_ROUTES.POSTS_ID_REPLIES, postId, options),
            {
                method: 'GET',
            },
            undefined,
            [`replies-${postId}`],
            15,
        )) as PaginatedResult<Reply>,
    );
}
