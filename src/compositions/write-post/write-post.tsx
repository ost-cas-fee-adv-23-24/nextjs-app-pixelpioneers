'use client'

import {
    Button,
    ButtonSize,
    FileUpload,
    IconCancel,
    IconSend,
    IconUpload,
    Label,
    LabelSize,
    Modal,
    ModalWidth,
    Textarea,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { PostFormTypeVariant } from '../post/types';
import DisplayName from '../display-name/display-name';
import { DisplayNameVariant } from '../display-name/types';
import { User } from '@/src/models/user.model';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function WritePost({
    variant,
    user,
}: {
    variant: PostFormTypeVariant;
    user: User;
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [image, setImage] = useState<string | undefined>(undefined);
    const imageRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsOpen(isOpen);
    }, [isOpen]);
    
    return (
        <>
            {variant === PostFormTypeVariant.MAINFIELD ? (
                <>
                <Label className="pl-xxl md:pl-0" size={LabelSize.XL} htmlFor="text">
                    Hey, was gibt&apos;s Neues?
                </Label>
                {image && (
                    <div className="flex flex-col">
                        <div className="w-fill relative h-[110px]">
                            <Image
                                src={image}
                                alt="Vorschau"
                                className="mx-auto rounded-m"
                                height={100}
                                width={100}
                            />
                        </div>
                        <Button
                            onClick={() => {
                                setImage(undefined);
                                if (imageRef.current) {
                                    imageRef.current.value = '';
                                }
                            }}
                            size={ButtonSize.M}
                            type="button"
                            Icon={IconCancel}
                            variant={Variant.PRIMARY}
                            fill
                            label="Bildvorschau löschen"
                            className="mt-m"
                        />
                    </div>
                )}
                </>
            ) : (
                <DisplayName variant={DisplayNameVariant.REPLY} user={user} />
            )}
            <Textarea
                className="h-15xl resize-none rounded-m border-2 border-secondary-200 bg-secondary-50 p-m"
                name="text"
                id="text"
                placeholder="Deine Meinung zählt!"
            ></Textarea>
            <section className="flex flex-row justify-between gap-s">
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
                    label="Absenden"
                    fill
                />
            </section>
            <Modal
                    onSubmit={() => setIsOpen(false)}
                    onCancel={() => setIsOpen(false)}
                    isOpen={isOpen}
                    title="Bild hochladen"
                    size={ModalWidth.M}
                    labelCancel="Abbrechen"
                    labelSubmit="Speichern"
                    // eslint-disable-next-line react/no-children-prop
                    children={
                        <FileUpload
                            maxFileSizeUpload={2000}
                            Icon={IconUpload}
                            label="Datei hierhin ziehen..."
                            labelButton="... oder Datei auswählen"
                        />
                    }
                />
        </>
    );
}
