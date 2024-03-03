import React from 'react';
import {
    Heading,
    HeadingLevel,
    Paragraph,
    ParagraphSize,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import DisplayName from '@/src/compositions/display-name/display-name';
import TabsProfile from '@/src/components/tabs-profile/tabs-profile';
import BackgroundImage from '@/src/components/background-image/background-image';
import User from '@/src/compositions/user/user';
import FollowStatus from '@/src/components/follow-status/follow-status';
import clsx from 'clsx';
import PostSkeleton from '@/src/compositions/post/post-skeleton';
import UserSkeleton from '@/src/compositions/user/user-skeleton';
import { DisplayNameVariant } from '@/src/compositions/display-name/types';

export default async function Profile() {
    const sectionClasses = 'flex w-full flex-col py-s md:w-[680px]';

    const session = await auth();
    return (
        <>
            <section className="flex min-h-screen flex-col items-center justify-between p-xl">
                <div className="mb-4 relative flex h-[200px] w-full flex-row rounded-m bg-primary-600 object-cover md:h-[320px] md:w-[680px] md:object-contain">
                    <BackgroundImage session={session} />
                </div>
                <section className={sectionClasses}>
                    <div className="mb-s ml-[-8px] self-start">
                        <DisplayName
                            user={{
                                id: '179944860378202369',
                                username: 'max_muster',
                                avatarUrl: 'string',
                                firstName: 'string',
                                lastName: 'string',
                            }}
                            variant={DisplayNameVariant.PROFILE}
                        />
                    </div>
                    <Paragraph
                        className="w-fill text-slate-400"
                        size={ParagraphSize.M}
                        title={'Über mich'}
                    >
                        Ostschweizer mit Leidenschaft für Fussball, designaffin, nie ohne Bart,
                        Weinliebhaber, leichte Tendenz zu Football Manager-Sucht, kocht gerne
                        indisch, baut seit neustem Duplotürme und Brio-Bahnanlagen.
                    </Paragraph>
                </section>
                <section className={sectionClasses}>
                    <TabsProfile />
                </section>
                <section className={clsx(sectionClasses, 'items-end py-s')}>
                    <FollowStatus />
                </section>
                <Heading
                    className="w-full py-s text-slate-600 md:w-[680px]"
                    variant={HeadingLevel.H3}
                >
                    Empfohlene User
                </Heading>
                <section className="flex w-full flex-row flex-wrap gap-s py-s md:w-[680px]">
                    <User />
                    <User />
                    <User />

                    <User />
                    <User />
                    <User />

                    <User />
                    <User />
                    <User />

                    <UserSkeleton />
                    <UserSkeleton />
                    <UserSkeleton />
                </section>
                <section className={sectionClasses}>
                    <PostSkeleton />
                    <PostSkeleton />
                </section>
            </section>
        </>
    );
}
