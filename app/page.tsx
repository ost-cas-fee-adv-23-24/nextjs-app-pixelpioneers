import React from 'react';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import LoginButton from '@/src/components/login/login-button';
import LogoutButton from '@/src/components/login/logout-button';
import LivePosts from '@/src/components/posts/live-posts';
import NewPost from '@/src/components/posts/new-post';
import Post from '@/src/components/posts/post';
import { getPostList } from '@/src/services/post.service';
import DisplayName from '@/src/compositions/display-name/display-name';
import RecommendedUser from '@/src/compositions/recommended-user/recommended-user';
import {
    Avatar,
    AvatarSize,
    ButtonSize,
    IconSettingsAnimated,
    LogoMumbleHorizontal,
    NaviButton,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

export default async function Home() {
    const session = await auth();
    const posts = await getPostList();
    return (
        <>
            <nav className="flex h-[80px] w-full items-center justify-around bg-primary-600 md:content-center">
                <div className="flex w-[800px] flex-row">
                    <LogoMumbleHorizontal
                        titleClasses="fill-white"
                        iconClasses="fill-white"
                        sizeWidth="235"
                        sizeHeight="34"
                        className="hidden md:flex"
                    />
                    <section className="flex flex-1 flex-row-reverse items-center">
                        {session ? (
                            <>
                                <LogoutButton />
                                <NaviButton
                                    size={ButtonSize.L}
                                    className="text-white"
                                    label={'Settings'}
                                    Icon={IconSettingsAnimated}
                                />
                            </>
                        ) : (
                            <LoginButton />
                        )}
                        <Avatar size={AvatarSize.S} alt="George Michael" />
                    </section>
                </div>
            </nav>
            <main className="p-24 flex min-h-screen flex-col items-center justify-between">
                {session && (
                    <>
                        <p>User: {session.user?.name}</p>
                        <DisplayName />
                        <RecommendedUser />
                    </>
                )}
                {session && <NewPost />}
                <section className="flex flex-col gap-y-m">
                    <LivePosts />
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </section>
            </main>
        </>
    );
}
