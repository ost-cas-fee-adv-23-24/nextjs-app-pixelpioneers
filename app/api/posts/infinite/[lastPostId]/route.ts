import { getPosts } from '@/app/actions/post';

export async function GET(/*request: NextRequest, { params }: { params: { lastPostId: string } }*/) {
    //const lastPostId = params.lastPostId;
    //const searchParams = request.nextUrl.searchParams;
    const postsResponse = await getPosts();

    return Response.json({ postsResponse });
}
