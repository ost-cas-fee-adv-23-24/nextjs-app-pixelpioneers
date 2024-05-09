'use client';
import {
    AvatarSize,
    EditAvatar as EditAvatarElement,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import ModalImageUpload from '@/src/components/modal/modal-image-upload';
import { useRef, useState } from 'react';
import { uploadAvatar } from '@/app/actions/user';

type AvatarWrapperProps = {
    desktopSize: AvatarSize;
    mobileSize?: AvatarSize;
    avatarUrl?: string;
    username?: string;
};

export default function EditAvatar({
    desktopSize,
    mobileSize,
    avatarUrl,
    username,
}: AvatarWrapperProps) {
    const alt = `Avatar von ${username || 'user'}`;
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    const onEdit = () => setIsOpen(true);
    return (
        <>
            <div className="hidden md:block">
                <EditAvatarElement src={avatarUrl} alt={alt} size={desktopSize} onEdit={onEdit} />
            </div>
            <div className="block md:hidden">
                <EditAvatarElement
                    src={avatarUrl}
                    alt={alt}
                    size={mobileSize || desktopSize}
                    onEdit={onEdit}
                />
            </div>
            <input
                type="file"
                name="media"
                id="media"
                ref={imageInputRef}
                disabled={!image}
                hidden
            />
            <ModalImageUpload
                onUpload={setImage}
                inputRef={imageInputRef}
                isOpen={isOpen}
                onSubmit={async () => {
                    if (image) {
                        const formData = new FormData();
                        formData.append('media', image);
                        const uploadResponse = await uploadAvatar(formData);
                        if (uploadResponse.isError) {
                            // TODO: error handling
                        }
                        setImage(null);
                        setIsOpen(false);
                    }
                }}
                onCancel={() => setIsOpen(false)}
            />
        </>
    );
}
