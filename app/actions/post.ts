'use server';

import { LikeType, Post, PostFilterOptions, Reply } from '@/src/models/post.model';
import { postReducer, postsReducer, repliesReducer } from '@/src/services/post.service';
import { request } from '@/src/services/request.service';
import { API_ROUTES, getRoute } from '@/src/helpers/routes';
import { FilterOptions, PaginatedResult } from '@/src/models/paginate.model';
import { dataResponse, errorResponse, getSession, getTag, Tag } from '@/app/actions/utils';
import { revalidateTag } from 'next/cache';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { validatePostData } from '@/src/helpers/validator';
import { ActionResponse } from '@/src/models/action.model';

export async function likePost(postId: string, likeType: LikeType): Promise<ActionResponse<void>> {
    const session = await getSession();
    const isLike = likeType === LikeType.LIKE;
    try {
        await request(
            getRoute(API_ROUTES.POSTS_ID_LIKES, postId),
            {
                method: isLike ? 'PUT' : 'DELETE',
            },
            session.accessToken,
        );

        revalidateTag(getTag(Tag.POSTS));
        return dataResponse(undefined);
    } catch (error) {
        return errorResponse(error, `${isLike ? '' : 'un'}like this post`);
    }
}

export async function createPost(formData: FormData): Promise<ActionResponse<Post>> {
    const session = await getSession();
    try {
        validatePostData(formData);
    } catch (error) {
        return errorResponse(error, 'validate post data');
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

        revalidateTag(getTag(Tag.POSTS));
        return dataResponse(post);
    } catch (error) {
        return errorResponse(error, 'create post');
    }
}

export async function getPost(postId: string): Promise<ActionResponse<Post>> {
    const session = await auth();
    try {
        const post = postReducer(
            (await request(
                getRoute(API_ROUTES.POSTS_ID, postId),
                {
                    method: 'GET',
                },
                session?.accessToken,
                [getTag(Tag.POST, postId)],
            )) as Post,
        );
        return dataResponse(post);
    } catch (error) {
        return errorResponse(error, 'get post');
    }
}

export async function deletePost(postId: string): Promise<ActionResponse<void>> {
    const session = await getSession();
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
        return errorResponse(error, 'delete post');
    }
}

/**
 * get all Posts, pagination and filter possible by options param
 * @param options
 */
export async function getPosts(
    options?: PostFilterOptions,
): Promise<ActionResponse<PaginatedResult<Post>>> {
    const session = await auth();
    // TODO: clean tags when options are given - ex. options as ID
    try {
        const paginatedPosts = postsReducer(
            (await request(
                getRoute(API_ROUTES.POSTS, undefined, options),
                {
                    method: 'GET',
                },
                session?.accessToken,
                [getTag(Tag.POSTS)],
                15,
            )) as PaginatedResult<Post>,
        );
        return dataResponse(paginatedPosts);
    } catch (error) {
        return errorResponse(error, 'get posts');
    }
}

export async function loadPaginatedPosts(formData: FormData): Promise<string> {
    const olderThanData = formData.get('olderThan');
    const olderThan = olderThanData ? olderThanData.toString() : undefined;
    // TODO: the rest of attributes
    return JSON.stringify(await getPosts({ olderThan, limit: 15 }));
}

export async function createReply(
    postId: string,
    formData: FormData,
): Promise<ActionResponse<Reply>> {
    const session = await getSession();
    try {
        validatePostData(formData);
    } catch (error) {
        return errorResponse(error, 'validate reply data');
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
        return errorResponse(error, 'create reply');
    }
}

/**
 * get all Replies from a certain Post, pagination possible by options param
 * @param postId
 * @param options
 */
export async function getReplies(
    postId: string,
    options?: FilterOptions,
): Promise<ActionResponse<PaginatedResult<Reply>>> {
    const session = await auth();
    try {
        const paginatedReplies = repliesReducer(
            (await request(
                getRoute(API_ROUTES.POSTS_ID_REPLIES, postId, options),
                {
                    method: 'GET',
                },
                session?.accessToken,
                [getTag(Tag.REPLIES, postId)],
                60,
            )) as PaginatedResult<Reply>,
        );
        return dataResponse(paginatedReplies);
    } catch (error) {
        return errorResponse(error, 'get replies');
    }
}
