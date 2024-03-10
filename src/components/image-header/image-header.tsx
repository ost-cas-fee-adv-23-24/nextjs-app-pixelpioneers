'use client';

import Image from 'next/image';

import { Avatar, AvatarSize, EditAvatar } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { getRandomImage } from './utils';
import { User } from '@/src/models/user.model';

export default function ImageHeader({ user, activeUser }: { user: User; activeUser?: boolean }) {
    // TODO: Need to observe why the error occurs in the console, cleanup
    const randomImage = getRandomImage(1, 6);
    const avatarAlt = user.avatarUrl ? `avatar from ${user.username}` : 'no image';
    return (
        <div className="mb-4 md:object-contai relative flex h-[200px] w-full flex-row rounded-m bg-primary-600 object-cover md:h-[320px] md:w-[800px]">
            <Image
                src={`/wallpapers/${randomImage}.jpg`}
                alt="Your Wallpaper"
                sizes="(max-width: 680px) 100vw"
                className="cursor-pointer rounded-m"
                fill
                loading="lazy"
            />
            <div className="absolute bottom-[-70px] right-[30px]">
                {activeUser ? (
                    <EditAvatar
                        src={user.avatarUrl}
                        alt={avatarAlt}
                        onEdit={() => console.info('open pop up')}
                    />
                ) : (
                    <Avatar src={user?.avatarUrl} alt={avatarAlt} size={AvatarSize.XL} />
                )}
            </div>
        </div>
    );
}
