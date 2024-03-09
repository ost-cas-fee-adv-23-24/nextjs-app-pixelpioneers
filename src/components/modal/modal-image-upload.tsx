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
    onLoadFile: (image: string) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
};

// const isImage = (fileName: string): boolean => {
//     const regEx = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);

//     if (fileName === null) {
//         return false;
//     }

//     return regEx.test(fileName) ? true : false;
// };

export default function ModalImageUpload({
    onLoadFile,
    inputRef,
    isOpen,
    setIsOpen,
}: ModalImageUploadProps) {
    const [isImage, setIsImage] = useState<File>();

    const hasFile = (file: File): void => {
        // TODO: Remove console
        /* eslint-disable no-alert, no-console */
        console.log('file ', file);
        setIsImage(isImage);
    };
    // console.log('isImage', isImage);

    const fileStatusClasses = clsx('self-center');

    return (
        <Modal
            onSubmit={() => {
                setIsOpen(false);
                if (inputRef.current) {
                    // TODO: Need to check how to get path
                    onLoadFile?.('');
                    // onChange?.(URL.createObjectURL());
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
                // TODO: Need to check how to get the whole file information
                onLoadFile={hasFile}
            />
            <div className="flex flex-row self-center">
                {isImage ? (
                    <>
                        <IconCheckmark className="mr-xs fill-primary-600" />
                        <Label
                            size={LabelSize.S}
                            className={clsx(fileStatusClasses, 'text-primary-600')}
                        >
                            Bild gewählt
                        </Label>
                    </>
                ) : (
                    <>
                        <IconCancel className="mr-xs fill-error" />
                        <Label size={LabelSize.S} className={clsx(fileStatusClasses, 'text-error')}>
                            Kein Bild gewählt
                        </Label>
                    </>
                )}
            </div>
        </Modal>
    );
}
