'use client';

import { FileUpload, IconUpload } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

export default function ImageUpload() {
    const setFile = (file: File) => {
        // eslint-disable-next-line no-console
        console.log(file);
    };

    return (
        <FileUpload
            maxFileSizeUpload={52428800}
            Icon={IconUpload}
            label="Datei hierhin ziehen..."
            labelButton="... oder Datei auswählen"
            onLoadFile={setFile}
        />
    );
}
