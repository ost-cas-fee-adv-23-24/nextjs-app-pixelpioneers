'use client';

import {
    Button,
    ButtonSize,
    IconCancel,
    IconSend,
    IconUpload,
    Label,
    LabelSize,
    Textarea,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { PostFormTypeVariant } from '../post/types';
import DisplayName from '../display-name/display-name';
import { DisplayNameVariant } from '../display-name/types';
import { User } from '@/src/models/user.model';
import { useRef, useState } from 'react';
import Image from 'next/image';
import ModalImageUpload from '@/src/components/modal/modal-image-upload';

type WritePostProps = {
    variant: PostFormTypeVariant;
    user: User;
    action?: (formData: FormData) => void;
};

export default function WritePost({ variant, user, action }: WritePostProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [image, setImage] = useState<string | undefined>(undefined);
    const imageRef = useRef<HTMLInputElement>(null);

    return (
        <form action={action} className="flex flex-col gap-y-s">
            {variant === PostFormTypeVariant.MAINFIELD ? (
                <>
                    <Label className="pl-xxl md:pl-0" size={LabelSize.XL} htmlFor="text">
                        Hey, was gibt&apos;s Neues?
                    </Label>
                    {image && (
                        <>
                            <div className="w-fill relative h-[200px]">
                                <Image
                                    src={image}
                                    alt="Vorschau"
                                    className="mx-auto rounded-m"
                                    height={200}
                                    width={200}
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
                        </>
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
            <input type="file" name="media" id="uploadImage" ref={imageRef} hidden />
            <ModalImageUpload
                onChange={setImage}
                inputRef={imageRef}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
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
        </form>
    );
}
