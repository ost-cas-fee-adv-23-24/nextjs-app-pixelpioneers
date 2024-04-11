import { getPosts } from '@/app/actions/post';
import { NextRequest } from 'next/server';
import { getPostOptionsFromRoute } from '@/src/helpers/routes';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const options = getPostOptionsFromRoute(searchParams);
    const postsResponse = await getPosts(options);

    return Response.json({ postsResponse });
}
