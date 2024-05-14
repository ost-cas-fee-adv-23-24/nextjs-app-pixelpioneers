'use client';

import {
    Button,
    ButtonSize,
    FileUpload,
    IconCancel,
    IconCheckmark,
    IconUpload,
    Label,
    LabelSize,
    Modal,
    ModalWidth,
    Variant,
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
    maxFileUploadSizeBytes: number;
    fileSizeLabel: string;
    onDelete?: () => void;
};

export default function ModalImageUpload({
    onChange,
    onUpload,
    inputRef,
    isOpen,
    onSubmit,
    onCancel,
    maxFileUploadSizeBytes,
    fileSizeLabel,
    onDelete,
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
            <div className="flex flex-col gap-s">
                {onDelete && (
                    <Button
                        Icon={IconCancel}
                        size={ButtonSize.M}
                        label="Bestehendes Bild löschen"
                        variant={Variant.SECONDARY}
                        onClick={onDelete}
                        fill
                    />
                )}
                <section>
                    <FileUpload
                        maxFileSizeUpload={maxFileUploadSizeBytes}
                        Icon={IconUpload}
                        label="Datei hierhin ziehen..."
                        labelFileSize={fileSizeLabel}
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
                </section>
            </div>
        </Modal>
    );
}
