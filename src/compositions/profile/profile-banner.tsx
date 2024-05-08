'use client';

import { AvatarSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { User } from '@/src/models/user.model';
import AvatarWrapper from '@/src/components/avatar-wrapper/avatar-wrapper';

type ImageHeaderProps = {
    user: User;
    isActiveUser?: boolean;
};
export default function ProfileBanner({ user, isActiveUser = false }: ImageHeaderProps) {
    return (
        <div className="relative flex h-[200px] w-full flex-row bg-gradient-to-r from-tertiary-500 to-primary-500 object-cover md:h-[320px] md:w-container md:rounded-m md:object-contain">
            <div className="absolute bottom-[-25px] right-[24px] z-10 md:bottom-[-70px] md:right-[30px]">
                <AvatarWrapper
                    desktopSize={AvatarSize.XL}
                    mobileSize={AvatarSize.L}
                    avatarUrl={user.avatarUrl}
                    onEditAvatar={isActiveUser ? () => console.info('open pop up') : undefined}
                />
            </div>
        </div>
    );
}
