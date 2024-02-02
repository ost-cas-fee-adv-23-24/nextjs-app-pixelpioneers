import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Post } from '../models/post.model';
import { PaginatedResult } from '../models/paginate.model';
import { apiUrl, authHeader } from '../helpers/api';

export async function createPost(text: string) {
    const session = await auth();
    const body = new FormData();
    body.append('text', text);

    const res = await fetch(`${apiUrl}/posts`, {
        method: 'POST',
        body,
        headers: {
            ...authHeader(session?.accessToken),
        },
    });

    return (await res.json()) as Post;
}

export async function getPostList() {
    const session = await auth();

    const res = await fetch(`${apiUrl}/posts`, {
        headers: {
            ...authHeader(session?.accessToken),
        },
    });
    const posts = (await res.json()) as PaginatedResult<Post>;
    return posts.data;
}
