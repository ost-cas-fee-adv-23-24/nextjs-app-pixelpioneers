'use client';

import Image from 'next/image';

import { Avatar, AvatarSize, EditAvatar } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { User } from '@/src/models/user.model';

type ImageHeaderProps = {
    user: User;
    isActiveUser?: boolean;
};
export default function ImageHeader({ user, isActiveUser = false }: ImageHeaderProps) {
    const avatarAlt = user.avatarUrl ? `Avatarbild von ${user.username}` : 'Kein Bild';
    return (
        <div className="relative flex h-[200px] w-full flex-row bg-primary-600 object-cover md:h-[320px] md:w-container md:rounded-m md:object-contain">
            <Image
                src={`/wallpapers/my-profile.jpg`}
                alt="Hintergrundbild Profil"
                className="cursor-pointer md:rounded-m"
                fill
                quality={75}
                loading="eager"
                priority
                aria-label="Hintergrund Bildprofil"
                sizes="(max-width: 680px) 100vw"
                style={{
                    width: '100%',
                }}
            />
            <div className="absolute bottom-[-25px] right-[24px] z-10 md:bottom-[-70px] md:right-[30px]">
                {isActiveUser ? (
                    <>
                        <div className="hidden md:block">
                            <EditAvatar
                                src={user.avatarUrl}
                                alt={avatarAlt}
                                size={AvatarSize.XL}
                                onEdit={/*TODO: open pop up */ () => console.info('open pop up')}
                            />
                        </div>
                        <div className="block md:hidden">
                            <EditAvatar
                                src={user.avatarUrl}
                                alt={avatarAlt}
                                size={AvatarSize.L}
                                onEdit={/*TODO: open pop up */ () => console.info('open pop up')}
                            />
                        </div>
                    </>
                ) : (
                    <Avatar src={user?.avatarUrl} alt={avatarAlt} size={AvatarSize.XL} />
                )}
            </div>
        </div>
    );
}
