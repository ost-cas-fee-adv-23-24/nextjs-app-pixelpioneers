'use client';
import { Avatar, AvatarSize, EditAvatar } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import ModalImageUpload from '@/src/components/modal/modal-image-upload';
import { useState } from 'react';

type AvatarWrapperProps = {
    desktopSize: AvatarSize;
    mobileSize: AvatarSize;
    avatarUrl?: string;
    avatarAlt?: string;
    /**
     * if left empty, avatar will not be editable
     */
    onEditAvatar?: () => void;
};

export default function AvatarWrapper({
    desktopSize,
    mobileSize,
    avatarUrl,
    avatarAlt,
    onEditAvatar,
}: AvatarWrapperProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="hidden md:block">
                {onEditAvatar ? (
                    <EditAvatar
                        src={avatarUrl}
                        alt={avatarAlt}
                        size={desktopSize}
                        onEdit={() => setIsOpen(true)}
                    />
                ) : (
                    <Avatar src={avatarUrl} alt={avatarAlt} size={desktopSize} />
                )}
            </div>
            <div className="block md:hidden">
                {onEditAvatar ? (
                    <EditAvatar
                        src={avatarUrl}
                        alt={avatarAlt}
                        size={mobileSize}
                        onEdit={onEditAvatar}
                    />
                ) : (
                    <Avatar src={avatarUrl} alt={avatarAlt} size={mobileSize} />
                )}
            </div>
            {onEditAvatar && (
                <ModalImageUpload
                    onChange={onEditAvatar}
                    inputRef={undefined}
                    isOpen={true}
                    onSubmit={() => console.info(isOpen)}
                    onCancel={() => console.info('e')}
                />
            )}
        </>
    );
}
