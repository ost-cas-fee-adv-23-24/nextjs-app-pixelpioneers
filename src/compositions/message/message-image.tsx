'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import ModalImageBox from '@/src/components/modal/modal-image-box';

type MessageImageProps = {
    imageUrl: string;
    imageType?: string;
    username: string;
    priority?: boolean;
};

export default function MessageImage({
    imageUrl,
    imageType,
    username,
    priority = false,
}: MessageImageProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button
                className="relative h-auto w-full transition duration-500 md:h-[320px]"
                onClick={() => setIsOpen(true)}
                aria-label="show image"
            >
                <Image
                    className="rounded-s"
                    alt={`Bild von ${username}`}
                    src={imageUrl}
                    datatype={imageType}
                    quality={30}
                    priority={priority}
                    height={320}
                    width={584}
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        maxWidth: '584px',
                        maxHeight: '320px',
                    }}
                />
            </button>
            <ModalImageBox
                isOpen={isOpen}
                imageUrl={imageUrl}
                imageType={imageType}
                username={username}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
