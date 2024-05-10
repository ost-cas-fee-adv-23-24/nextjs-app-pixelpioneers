import { Modal, ModalWidth } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import Image from 'next/image';
import React from 'react';

type ModalImageBoxProps = {
    isOpen: boolean;
    imageUrl: string;
    imageType?: string;
    username: string;
    onClose: () => void;
};

export default function ModalImageBox({
    imageUrl,
    imageType,
    username,
    isOpen,
    onClose,
}: ModalImageBoxProps) {
    return (
        <Modal
            onCancel={onClose}
            isOpen={isOpen}
            title={`Bild von ${username}`}
            size={ModalWidth.L}
            hideActions
        >
            {isOpen ? (
                <Image
                    className="rounded-s"
                    alt={`Bild von ${username}`}
                    src={imageUrl}
                    datatype={imageType}
                    quality={90}
                    height={1000}
                    width={650}
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        maxWidth: '1000px',
                        maxHeight: '650px',
                    }}
                    loading="lazy"
                />
            ) : (
                <div className="h-[200px] w-full animate-pulse bg-slate-300 md:h-[650px] md:rounded-m" />
            )}
        </Modal>
    );
}
