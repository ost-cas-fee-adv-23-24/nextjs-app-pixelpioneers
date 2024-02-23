'use client';

import Image from 'next/image';

import { Avatar, AvatarSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { Session } from 'next-auth';
import { getRandomImage } from './utils';

export default function BackgroundImage({ session }: { session: Session | null }) {
    // TODO: Need to observe why the error occurs in the console
    const randomImage = getRandomImage(1, 6);
    return (
        <div className="mb-4 md:object-contai relative flex h-[200px] w-full flex-row rounded-m bg-primary-600 object-cover md:h-[320px] md:w-[800px]">
            {session ? (
                <Image
                    src={`/wallpapers/${randomImage}.jpg`}
                    alt="Your Wallpaper"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="cursor-pointer rounded-m"
                    fill
                    quality={75}
                    loading="lazy"
                />
            ) : (
                <Image
                    src={`/wallpapers/${randomImage}.jpg`}
                    alt="Your Wallpaper"
                    className="rounded-m"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    quality={75}
                    loading="lazy"
                />
            )}
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
    );
}
