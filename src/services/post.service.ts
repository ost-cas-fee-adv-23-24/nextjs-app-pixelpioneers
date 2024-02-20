import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Post } from '../models/post.model';
import { PaginatedResult } from '../models/paginate.model';
import { apiUrl, authHeader } from '../helpers/api';
import { decodeTime } from 'ulid';

export async function getPostList() {
    const session = await auth();

    const response = await fetch(`${apiUrl}/posts`, {
        headers: {
            ...authHeader(session?.accessToken),
        },
    });
    const posts = (await response.json()) as PaginatedResult<Post>;
    return posts.data;
}

export function postReducer(post: Post): Post {
    return { ...post, created: decodeTime(post.id) };
}

export function postsReducer(paginatedPosts: PaginatedResult<Post>): PaginatedResult<Post> {
    return { ...paginatedPosts, data: paginatedPosts.data.map((post) => postReducer(post)) };
}
