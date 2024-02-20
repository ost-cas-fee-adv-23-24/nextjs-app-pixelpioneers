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
import RecommendedUser from '@/src/compositions/recommended-user/recommended-user';
import FollowStatus from '@/src/components/follow-status/follow-status';
import clsx from 'clsx';

export default async function Profile() {
    const sectionClasses = 'flex w-full flex-col py-s md:w-[680px]';

    const session = await auth();
    return (
        <>
            {/* <section className="flex h-[200px] w-[680px] items-center justify-around md:content-center">
                <div className="flex h-[200px] animate-pulse flex-row items-center justify-center space-x-m">
                    <div className="h-xl w-xl rounded-full bg-slate-300 "></div>
                    <div className="flex flex-col space-y-m">
                        <div className="h-[8px] w-[200px] rounded-m bg-slate-300 "></div>
                        <div className="h-[8px] w-[200px] rounded-m bg-slate-300 "></div>
                    </div>
                </div>

            </section> */}

            {/* <section className="flex h-full w-full flex-col items-center justify-around gap-y-l md:content-center"> */}
            <section className="flex min-h-screen flex-col items-center justify-between p-xl">
                <section className="rounded flex h-[40px] w-full animate-pulse items-center justify-around bg-slate-300 md:w-[680px] md:content-center"></section>

                <section className={sectionClasses}>
                    <div className="animate-pulse space-y-[4px] py-[4px]">
                        <div className="rounded h-[32px] w-full bg-slate-300"></div>
                        <div className="space-y-[2px]">
                            <div className="rounded h-[4px] w-2/3 bg-slate-300"></div>
                            <div className="rounded h-[4px] w-2/3 bg-slate-300"></div>
                            <div className="rounded h-[4px] w-2/3 bg-slate-300"></div>
                        </div>
                    </div>
                </section>

                <div className="mb-4 relative flex h-[200px] w-full flex-row rounded-m bg-primary-600 object-cover md:h-[320px] md:w-[680px] md:object-contain">
                    <BackgroundImage session={session} />
                </div>
                <section className={sectionClasses}>
                    <div className="ml-[-24px] self-start">
                        <DisplayName showAvatar={false}></DisplayName>
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
                    <RecommendedUser />
                    <RecommendedUser />
                    <RecommendedUser />

                    <RecommendedUser />
                    <RecommendedUser />
                    <RecommendedUser />

                    <RecommendedUser />
                    <RecommendedUser />
                    <RecommendedUser />
                </section>
                <section className={sectionClasses}>Posts...</section>
            </section>
        </>
    );
}
