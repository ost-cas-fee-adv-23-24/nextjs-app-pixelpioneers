import { Post, Reply } from '../models/post.model';
import { PaginatedResult } from '../models/paginate.model';
import { decodeTime } from 'ulid';
import { User } from '../models/user.model';

export function postReducer(post: Post): Post {
    return { ...post, created: decodeTime(post.id) };
}

export function postsReducer(paginatedPosts: PaginatedResult<Post>): PaginatedResult<Post> {
    return {
        ...paginatedPosts,
        data: paginatedPosts.data.map((post) => postReducer(post)),
    };
}

export function replyReducer(reply: Reply): Reply {
    return { ...reply, created: decodeTime(reply.id) };
}

export function repliesReducer(paginatedReplies: PaginatedResult<Reply>): PaginatedResult<Reply> {
    return {
        ...paginatedReplies,
        data: paginatedReplies.data.map((reply) => replyReducer(reply)),
    };
}

export function userPostHydrator(post: Post, user: User): Post {
    return {
        ...post,
        creator: {
            ...post.creator,
            firstname: user.firstname,
            lastname: user.lastname,
        },
    };
}

export function userPostsHydrator(
    paginatedPosts: PaginatedResult<Post>,
    user: User,
): PaginatedResult<Post> {
    return {
        ...paginatedPosts,
        data: paginatedPosts.data.map((post) => userPostHydrator(post, user)),
    };
}
