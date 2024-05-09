'use server';

import { FilterOptions, LikeType, Message, Post, Reply } from '@/src/models/message.model';
import { messageHydrator, messagesHydrator } from '@/src/services/message.service';
import { request } from '@/src/services/request.service';
import { API_ROUTES, getRoute, getTag, Tag } from '@/src/helpers/routes';
import { PaginatedResult, PAGINATION_LIMIT, PaginationOptions } from '@/src/models/paginate.model';
import { dataResponse, errorResponse } from '@/app/actions/utils';
import { revalidateTag } from 'next/cache';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { validatePostData } from '@/src/helpers/validator';
import { ActionResponse, ErrorType, RevalidationTime } from '@/src/models/action.model';

export async function likePost(postId: string, likeType: LikeType): Promise<string> {
    const isLike = likeType === LikeType.LIKE;
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        return JSON.stringify(errorResponse(ErrorType.AUTHORIZATION));
    }

    try {
        await request(
            getRoute(API_ROUTES.POSTS_ID_LIKES, postId),
            {
                method: isLike ? 'PUT' : 'DELETE',
            },
            session.accessToken,
        );

        revalidateTag(getTag(Tag.POSTS));
        return JSON.stringify(dataResponse(undefined));
    } catch (error) {
        return JSON.stringify(errorResponse(ErrorType.EXECUTION));
    }
}

export async function createPost(formData: FormData): Promise<ActionResponse<Post>> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        return errorResponse(ErrorType.AUTHORIZATION);
    }

    try {
        validatePostData(formData);
    } catch (error) {
        return errorResponse(ErrorType.VALIDATION);
    }

    try {
        const post = (await request(
            getRoute(API_ROUTES.POSTS),
            {
                method: 'POST',
                body: formData,
            },
            session.accessToken,
        )) as Post;

        revalidateTag(getTag(Tag.POSTS, undefined, { limit: PAGINATION_LIMIT }));
        session.user?.profile.sub &&
            revalidateTag(
                getTag(Tag.POSTS, undefined, {
                    creator: [session.user.profile.sub],
                    limit: PAGINATION_LIMIT,
                }),
            );
        return dataResponse(post);
    } catch (error) {
        return errorResponse(ErrorType.EXECUTION);
    }
}

export async function getPost(postId: string): Promise<ActionResponse<Post>> {
    const session = await auth();
    try {
        const post = messageHydrator(
            (await request(
                getRoute(API_ROUTES.POSTS_ID, postId),
                {
                    method: 'GET',
                },
                session?.accessToken,
                [getTag(Tag.POST, postId)],
                RevalidationTime.LONG,
            )) as Post,
        );
        return dataResponse(post);
    } catch (error) {
        return errorResponse(ErrorType.FETCH);
    }
}

export async function deletePost(postId: string): Promise<ActionResponse<void>> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        return errorResponse(ErrorType.AUTHORIZATION);
    }

    try {
        await request(
            getRoute(API_ROUTES.POSTS_ID, postId),
            {
                method: 'DELETE',
            },
            session.accessToken,
        );

        revalidateTag(getTag(Tag.POSTS));
        return dataResponse(undefined);
    } catch (error) {
        return errorResponse(ErrorType.EXECUTION);
    }
}

/**
 * get all Posts, pagination and filter possible by options param
 * @param options
 */
export async function getPosts(
    options?: FilterOptions,
): Promise<ActionResponse<PaginatedResult<Post>>> {
    const session = await auth();
    try {
        const paginatedPosts = messagesHydrator(
            (await request(
                getRoute(API_ROUTES.POSTS, undefined, options),
                {
                    method: 'GET',
                },
                session?.accessToken,
                [getTag(Tag.POSTS, undefined, options)],
                RevalidationTime.SHORT,
            )) as PaginatedResult<Post>,
        );
        return dataResponse(paginatedPosts);
    } catch (error) {
        return errorResponse(ErrorType.FETCH);
    }
}

export async function loadPaginatedMessages(formData: FormData): Promise<string> {
    const nextData = formData.get('next');
    if (nextData === null) {
        return JSON.stringify(errorResponse(ErrorType.VALIDATION));
    }
    const route = nextData.toString().split(process.env.NEXT_PUBLIC_API_BASE_URL || '')[1];
    if (route === '' || !route.startsWith('/posts')) {
        return JSON.stringify(errorResponse(ErrorType.VALIDATION));
    }

    const session = await auth();
    try {
        const paginatedMessages = messagesHydrator(
            (await request(
                route,
                {
                    method: 'GET',
                },
                session?.accessToken,
                undefined,
                RevalidationTime.SHORT,
            )) as PaginatedResult<Message>,
        );
        return JSON.stringify(dataResponse(paginatedMessages));
    } catch (error) {
        return JSON.stringify(errorResponse(ErrorType.FETCH));
    }
}

export async function createReply(
    postId: string,
    formData: FormData,
): Promise<ActionResponse<Reply>> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        return errorResponse(ErrorType.AUTHORIZATION);
    }

    try {
        validatePostData(formData);
    } catch (error) {
        return errorResponse(ErrorType.VALIDATION);
    }

    try {
        const reply = (await request(
            getRoute(API_ROUTES.POSTS_ID_REPLIES, postId),
            {
                method: 'POST',
                body: formData,
            },
            session.accessToken,
        )) as Reply;

        revalidateTag(getTag(Tag.REPLIES, postId));
        return dataResponse(reply);
    } catch (error) {
        return errorResponse(ErrorType.EXECUTION);
    }
}

/**
 * get all Replies from a certain Post, pagination possible by options param
 * @param postId
 * @param options
 */
export async function getReplies(
    postId: string,
    options?: PaginationOptions,
): Promise<ActionResponse<PaginatedResult<Reply>>> {
    const session = await auth();
    try {
        const paginatedReplies = messagesHydrator(
            (await request(
                getRoute(API_ROUTES.POSTS_ID_REPLIES, postId, options),
                {
                    method: 'GET',
                },
                session?.accessToken,
                [getTag(Tag.REPLIES, postId)],
                RevalidationTime.MEDIUM,
            )) as PaginatedResult<Reply>,
        );
        return dataResponse(paginatedReplies);
    } catch (error) {
        return errorResponse(ErrorType.FETCH);
    }
}
