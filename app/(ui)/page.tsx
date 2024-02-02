import React from 'react';
import Image from 'next/image';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import LoginButton from '@/src/components/login-button';
import LogoutButton from '@/src/components/logout-button';
import LivePosts from '@/src/components/live-posts';
import NewPost from '@/src/components/new-post';
import Post from '@/src/components/post';
import { getPostList } from '@/src/services/post.service';
import DisplayName from '@/src/compositions/display-name/display-name';
import {
    Button,
    ButtonSize,
    IconProfile,
    Label,
    LabelSize,
    LabelType,
    // NaviUser,
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
            {/* <NaviUser
                variant={Variant.SECONDARY}
                Icon={IconProfile}
                size={ButtonSize.L}
                label="Profile"
                onClick={() => {
                    console.info('Hello');
                }}
            /> */}
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
