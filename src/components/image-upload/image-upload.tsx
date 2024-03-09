'use client';

import {
    FileUpload,
    IconCancel,
    IconCheckmark,
    IconUpload,
    Label,
    LabelSize,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import clsx from 'clsx';
import { useState } from 'react';

// const isImage = (fileName: string): boolean => {
//     const regEx = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);

//     if (fileName === null) {
//         return false;
//     }

//     return regEx.test(fileName) ? true : false;
// };

export default function ImageUpload() {
    const [isImage, setIsImage] = useState('');

    const setFile = (file: File): void => {
        // isImageType = isImage(file.name);
        setIsImage(file.name);
    };

    const fileStatusText = clsx('self-center');

    return (
        <>
            <FileUpload
                maxFileSizeUpload={52428800}
                Icon={IconUpload}
                label="Datei hierhin ziehen..."
                labelButton="... oder Datei auswählen"
                onLoadFile={setFile}
            />
            <div className="flex flex-row self-center">
                {isImage ? (
                    <>
                        <IconCheckmark className="mr-xs fill-primary-600" />
                        <Label
                            size={LabelSize.S}
                            className={clsx(fileStatusText, 'text-primary-600')}
                        >
                            Bild gewählt
                        </Label>
                    </>
                ) : (
                    <>
                        <IconCancel className="mr-xs fill-error" />
                        <Label size={LabelSize.S} className={clsx(fileStatusText, 'text-error')}>
                            Kein Bild gewählt
                        </Label>
                    </>
                )}
            </div>
        </>
    );
}
