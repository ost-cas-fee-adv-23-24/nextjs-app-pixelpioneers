'use client';

import {
    FileUpload,
    IconCancel,
    IconCheckmark,
    IconUpload,
    Label,
    LabelSize,
    Modal,
    ModalWidth,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import clsx from 'clsx';
import { useState } from 'react';

type ModalImageUploadProps = {
    onChange: (image: string) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
};

export default function ModalImageUpload({
    onChange,
    inputRef,
    isOpen,
    setIsOpen,
}: ModalImageUploadProps) {
    const [currentImageEvent, setCurrentImageEvent] = useState<File | undefined>(undefined);

    return (
        <Modal
            onSubmit={() => {
                setIsOpen(false);
                if (currentImageEvent && inputRef.current) {
                    onChange?.(URL.createObjectURL(currentImageEvent));
                }
            }}
            onCancel={() => setIsOpen(false)}
            isOpen={isOpen}
            title="Bild hochladen"
            size={ModalWidth.M}
            labelCancel="Abbrechen"
            labelSubmit="Speichern"
        >
            <FileUpload
                maxFileSizeUpload={52428800}
                Icon={IconUpload}
                label="Datei hierhin ziehen..."
                labelButton="... oder Datei auswählen"
                onLoadFile={(file) => setCurrentImageEvent(file)}
            />
            <div className="flex flex-row self-center">
                {currentImageEvent ? (
                    <IconCheckmark className="mr-xs fill-primary-600" />
                ) : (
                    <IconCancel className="mr-xs fill-error" />
                )}
                <Label
                    size={LabelSize.S}
                    className={clsx(
                        'self-center',
                        currentImageEvent ? 'text-primary-600' : 'text-error',
                    )}
                >
                    {!currentImageEvent && 'Kein '}Bild gewählt
                </Label>
            </div>
        </Modal>
    );
}