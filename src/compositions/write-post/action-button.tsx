'use client';

import {
    Button,
    ButtonSize,
    IconSend,
    IconUpload,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

type ActionProps = {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
};

export default function ActionButton({ isOpen, setIsOpen }: ActionProps) {
    return (
        <>
            <Button
                type="button"
                Icon={IconUpload}
                size={ButtonSize.M}
                variant={Variant.SECONDARY}
                label="Bild hochladen"
                fill
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
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
