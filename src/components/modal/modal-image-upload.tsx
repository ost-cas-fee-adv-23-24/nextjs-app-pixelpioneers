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
    onChange?: (image: string) => void;
    onUpload?: (image: File) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
    isOpen: boolean;
    onSubmit: () => void;
    onCancel: () => void;
};

export default function ModalImageUpload({
    onChange,
    onUpload,
    inputRef,
    isOpen,
    onSubmit,
    onCancel,
}: ModalImageUploadProps) {
    const [currentImageEvent, setCurrentImageEvent] = useState<File | null>(null);

    return (
        <Modal
            onSubmit={() => {
                if (currentImageEvent) {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(currentImageEvent);
                    onChange?.(URL.createObjectURL(dataTransfer.files[0]));
                    if (inputRef && inputRef.current) {
                        inputRef.current.files = dataTransfer.files;
                    }
                }
                onSubmit();
            }}
            onCancel={onCancel}
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
                onLoadFile={(file) => {
                    setCurrentImageEvent(file);
                    onUpload?.(file);
                }}
            />
            <div className="flex flex-row gap-xs self-center">
                {currentImageEvent ? (
                    <IconCheckmark className="fill-primary-600" />
                ) : (
                    <IconCancel className="fill-slate-400" />
                )}
                <Label
                    size={LabelSize.S}
                    className={clsx(
                        'self-center',
                        currentImageEvent ? 'text-primary-600' : 'text-slate-400',
                    )}
                >
                    {!currentImageEvent && 'Kein '}Bild hochgeladen
                </Label>
            </div>
        </Modal>
    );
}
