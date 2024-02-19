'use client';

import Image from 'next/image';

import { Avatar, AvatarSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { Session } from 'next-auth';

const uploadBackgroundImage = () => {
    alert('There will be an dialog appeared!');
};

export default function BackgroundImage({ session }: { session: Session | null }) {
    return (
        <div className="mb-4 relative flex h-[200px] w-full flex-row rounded-m bg-primary-600 object-cover md:h-[320px] md:w-[800px] md:object-contain">
            {session ? (
                <Image
                    src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2018/04/05/668453-cyberattacks-thinkstock-113017.jpg"
                    alt="Profile"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="cursor-pointer"
                    onClick={() => {
                        uploadBackgroundImage();
                    }}
                />
            ) : (
                <Image
                    src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2018/04/05/668453-cyberattacks-thinkstock-113017.jpg"
                    alt="Profile"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
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
