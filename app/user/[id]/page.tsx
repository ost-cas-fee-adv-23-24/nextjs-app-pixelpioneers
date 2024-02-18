import React from 'react';
import Image from 'next/image';
import {
    Avatar,
    AvatarSize,
    Paragraph,
    ParagraphSize,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import DisplayName from '@/src/compositions/display-name/display-name';
import TabsProfile from '@/src/components/tabs-profile/tabs-profile';

export default async function Profile() {
    const session = await auth();
    return (
        <>
            {/* <section className="flex h-[200px] w-[800px] items-center justify-around md:content-center">
                <div className="flex h-[200px] animate-pulse flex-row items-center justify-center space-x-m">
                    <div className="h-xl w-xl rounded-full bg-slate-300 "></div>
                    <div className="flex flex-col space-y-m">
                        <div className="h-[8px] w-[200px] rounded-m bg-slate-300 "></div>
                        <div className="h-[8px] w-[200px] rounded-m bg-slate-300 "></div>
                    </div>
                </div>

            </section> */}

            <section className="flex h-full w-full flex-col items-center justify-around gap-y-l md:content-center">
                <section className="rounded flex h-[40px] w-[800px] animate-pulse items-center justify-around bg-slate-300 md:content-center"></section>

                <section>
                    <div className="animate-pulse space-y-[4px] p-[4px]">
                        <div className="rounded h-[32px] w-full bg-slate-300"></div>
                        <div className="space-y-[2px]">
                            <div className="rounded h-[4px] w-[600px] bg-slate-300"></div>
                            <div className="rounded h-[4px] w-[300px] bg-slate-300"></div>
                        </div>
                    </div>
                </section>

                <div className="mb-4 relative flex h-[320px] w-[800px] cursor-pointer flex-row rounded-m bg-primary-600 object-contain">
                    <Image
                        src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2018/04/05/668453-cyberattacks-thinkstock-113017.jpg"
                        alt="Profile"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                    />
                    <div className="absolute bottom-[-70px] right-[30px]">
                        <Avatar
                            src={(session?.user && session.user.image) || null || undefined}
                            alt={'Name Vorname'}
                            size={AvatarSize.XL}
                        />
                        {/* <EditAvatar
                        src={session && session?.user?.image || null || undefined}
                        alt={'Name Vorname'}
                        onEdit={() => auth()}
                    /> */}
                    </div>
                </div>
                <section className="flex w-[800px] flex-col">
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
                <section className="flex w-[800px] flex-col">
                    <TabsProfile />
                </section>
                <section className="flex w-[800px] flex-col">Posts...</section>
            </section>
        </>
    );
}
