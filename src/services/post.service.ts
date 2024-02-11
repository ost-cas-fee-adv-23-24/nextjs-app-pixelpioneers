import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Post } from '../models/post.model';
import { PaginatedResult } from '../models/paginate.model';
import { apiUrl, authHeader } from '../helpers/api';

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
