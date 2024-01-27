import React from 'react';
import Image from 'next/image';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import LoginButton from '@/src/components/login-button';
import LogoutButton from '@/src/components/logout-button';
import LivePosts from '@/src/components/live-posts';
import NewPost from '@/src/components/new-post';
import Post from '@/src/components/post';
import { getPostList } from '@/src/helpers/api';
import DisplayName from '@/src/compositions/display-name';

export default async function Home() {
    const session = await auth();
    const posts = await getPostList();
    return (
        <main className="p-24 flex min-h-screen flex-col items-center justify-between">
            <div className="before:bg-gradient-radial after:bg-gradient-conic after:from-sky-200 after:via-blue-200 before:dark:to-blue-700 after:dark:from-sky-900 relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:opacity-10 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
                <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
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

            {/*<div className="flex flex-col gap-xl bg-white p-xl">

                <IconOnlyButton Icon={IconMumble} aria-label="mumble logo button" />
                <EditAvatar
                    onEdit={() => {
                        console.log('hello');
                    }}
                    alt={'dd'}
                />
                <Input
                    label="I'm an input"
                    name="input-test"
                    type={InputType.TEXT}
                    Icon={IconCalendar}
                />
                <Textarea
                    name="textarea-test"
                    onChange={(e) => {
                        console.log(e);
                    }}
                />
                <IconLink label="username" Icon={IconProfile} variant={Variant.TERTIARY} />
                <LikeButton isLiked={true} amount={9} />
                <EditAvatar
                    onEdit={() => {
                        console.log('hello');
                    }}
                    alt={'dd'}
                />
                <Button Icon={IconEye} size={ButtonSize.M} label={'eee'} />
                <Tabs
                    tabs={[
                        { label: 'tab 1', onClick: () => console.log('1 clicked') },
                        {
                            label: 'tab 2',
                            onClick: () => console.log('2 clicked'),
                        },
                    ]}
                    activeTabIndex={0}
                />

                <Heading size={HeadingSize.H1} className={'text-tertiary-600'}>
                    hello!
                </Heading>

                <ShareButton
                    label="hello copy me"
                    labelShared="you did it!"
                    link="https://migros.ch"
                />
            </div>*/}
        </main>
    );
}
