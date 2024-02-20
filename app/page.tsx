import React from 'react';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import NewPost from '@/src/components/posts/form-post';
import DisplayName from '@/src/compositions/display-name/display-name';
import RecommendedUser from '@/src/compositions/recommended-user/recommended-user';

export default async function Home() {
    const session = await auth();
    return (
        <>
            {session && (
                <>
                    <p>User: {session.user?.name}</p>
                    <DisplayName />
                    <RecommendedUser />
                </>
            )}
            {session && <NewPost />}
        </>
    );
}
