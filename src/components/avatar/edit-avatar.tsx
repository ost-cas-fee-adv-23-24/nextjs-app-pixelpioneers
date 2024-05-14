'use client';
import {
    AvatarSize,
    EditAvatar as EditAvatarElement,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import ModalImageUpload from '@/src/components/modal/modal-image-upload';
import React, { useRef, useState } from 'react';
import { removeAvatar, uploadAvatar } from '@/app/actions/user';
import { ErrorType, getErrorMessage } from '@/src/models/action.model';
import { ErrorBubble } from '@/src/components/bubble/error-bubble';
import { useRouter } from 'next/navigation';

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
    const [error, setError] = useState<ErrorType>();
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

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
                            setError(uploadResponse.error);
                        }
                        setImage(null);
                        setIsOpen(false);
                    }
                }}
                onCancel={() => setIsOpen(false)}
                maxFileUploadSizeBytes={524288}
                fileSizeLabel="JPEG oder PNG, maximal 0.5 MB"
                onDelete={
                    avatarUrl
                        ? async () => {
                              const deleteResponse = await removeAvatar();
                              if (deleteResponse.isError) {
                                  setError(deleteResponse.error);
                              }
                              setIsOpen(false);
                          }
                        : undefined
                }
            />
            {error && (
                <ErrorBubble
                    message={getErrorMessage(error, true)}
                    onClick={() => {
                        router.push(window.location.pathname);
                        setError(undefined);
                    }}
                />
            )}
        </>
    );
}
