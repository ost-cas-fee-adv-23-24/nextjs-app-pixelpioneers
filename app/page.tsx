import React from 'react';
import Image from 'next/image';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import LoginButton from '@/components/login-button';
import LogoutButton from '@/components/logout-button';
import LivePosts from '@/components/live-posts';
import NewPost from '@/components/new-post';
import Post from '@/components/post';
import { getPostList } from '@/mumble/api';

export default async function Home() {
    const session = await auth();
    const posts = await getPostList();
    return (
        <main className="p-24 flex min-h-screen flex-col items-center justify-between">
            <div className="font-mono z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
                <p className="border-gray-300 from-zinc-200 pb-6 pt-8 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 fixed left-0 top-0 flex w-full justify-center border-b  bg-gradient-to-b backdrop-blur-2xl lg:static lg:w-auto lg:border">
                    Get started by editing&nbsp;
                    <code className="font-mono font-bold">app/page.tsx</code>
                </p>
                <div className="h-48 fixed bottom-0 left-0 flex w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <a
                        className="gap-2 p-8 pointer-events-none flex place-items-center lg:pointer-events-auto lg:p-0"
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        By{' '}
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            className="dark:invert"
                            width={100}
                            height={24}
                            priority
                        />
                    </a>
                </div>
            </div>

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

            <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
                <a
                    href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    className="rounded-lg px-5 py-4 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 group border border-transparent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Docs{' '}
                        <span className="group-hover:translate-x-1 inline-block transition-transform motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Find in-depth information about Next.js features and API.
                    </p>
                </a>

                <a
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    className="rounded-lg px-5 py-4 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 group border border-transparent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Learn{' '}
                        <span className="group-hover:translate-x-1 inline-block transition-transform motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Learn about Next.js in an interactive course with&nbsp;quizzes!
                    </p>
                </a>

                <a
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    className="rounded-lg px-5 py-4 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 group border border-transparent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Templates{' '}
                        <span className="group-hover:translate-x-1 inline-block transition-transform motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Explore the Next.js 13 playground.
                    </p>
                </a>

                <a
                    href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    className="rounded-lg px-5 py-4 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 group border border-transparent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Deploy{' '}
                        <span className="group-hover:translate-x-1 inline-block transition-transform motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Instantly deploy your Next.js site to a shareable URL with Vercel.
                    </p>
                </a>
            </div>
        </main>
    );
}
