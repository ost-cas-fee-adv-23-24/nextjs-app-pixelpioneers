'use client';

import {
    Button,
    ButtonSize,
    IconSend,
    IconUpload,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

type MessageFormActionsProps = {
    onUpload: () => void;
};

export default function MessageFormActions({ onUpload }: MessageFormActionsProps) {
    return (
        <>
            <Button
                type="button"
                Icon={IconUpload}
                size={ButtonSize.M}
                variant={Variant.SECONDARY}
                label="Bild hochladen"
                fill
                onClick={onUpload}
            />
            <Button
                type="submit"
                Icon={IconSend}
                size={ButtonSize.M}
                variant={Variant.PRIMARY}
                fill
                label="Absenden"
            />
        </>
    );
}
