'use client';

import Image from 'next/image';

import { Avatar, AvatarSize, EditAvatar } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { User } from '@/src/models/user.model';

export default function ImageHeader({
    user,
    activeUser = false,
}: {
    user: User;
    activeUser?: boolean;
}) {
    const pathToBgImage = 'my-profile.jpg';
    const avatarAlt = user.avatarUrl ? `avatar from ${user.username}` : 'no image';
    return (
        <div className="relative flex h-[200px] w-full flex-row bg-primary-600 object-cover md:h-[320px] md:w-[680px] md:rounded-m md:object-contain">
            <Image
                src={`/wallpapers/${pathToBgImage}`}
                alt="Hintergrund Bildprofil"
                className="cursor-pointer md:rounded-m"
                height={320}
                width={680}
                quality={75}
                loading="eager"
                priority={false}
                style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: 'auto',
                }}
                aria-label="Hintergrund Bildprofil"
                sizes="(max-width: 680px) 100vw"
            />
            <div className="absolute bottom-[-25px] right-[15px] z-10 md:bottom-[-70px] md:right-[30px]">
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
