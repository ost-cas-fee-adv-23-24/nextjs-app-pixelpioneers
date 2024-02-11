import React from 'react';
import Image from 'next/image';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import LoginButton from '@/src/components/login/login-button';
import LogoutButton from '@/src/components/login/logout-button';
import LivePosts from '@/src/components/posts/live-posts';
import NewPost from '@/src/components/posts/new-post';
import Post from '@/src/components/posts/post';
import { getPostList } from '@/src/services/post.service';
import DisplayName from '@/src/compositions/display-name/display-name';
import {
    Button,
    ButtonSize,
    IconProfile,
    Label,
    LabelSize,
    LabelType,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import RecommendedUser from '@/src/compositions/recommended-user/recommended-user';

export default async function Home() {
    const session = await auth();
    const posts = await getPostList();
    return (
        <main className="p-24 flex min-h-screen flex-col items-center justify-between">
            <h1 className="p-m">Hello!</h1>
            <div className="relative z-[-1] flex place-items-center">
                <Image
                    className="relative"
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={180}
                    height={37}
                    priority
                />
            </div>
            {session ? (
                <div>
                    <p>{session.user?.name}</p>
                    <LogoutButton />
                    <DisplayName />
                    <RecommendedUser />
                </div>
            ) : (
                <div>
                    <LoginButton />
                </div>
            )}
            {session && (
                <div>
                    <h2>Create a post</h2>
                    <NewPost />
                </div>
            )}
            <Button
                Icon={IconProfile}
                size={ButtonSize.M}
                variant={Variant.PRIMARY}
                label={'hey'}
            />
            <Label size={LabelSize.L} type={LabelType.SPAN}>
                hello
            </Label>
            <div>
                <h2>Latest Posts</h2>
                <LivePosts />
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Post post={post} />
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
