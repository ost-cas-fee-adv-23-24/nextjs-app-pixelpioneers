'use client';

import {
    Button,
    ButtonSize,
    IconCancel,
    Label,
    LabelSize,
    Textarea,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { MessageVariant, PostFormTypeVariant } from '../post/types';
import DisplayName from '../display-name/display-name';
import { DisplayNameVariant } from '../display-name/types';
import { User } from '@/src/models/user.model';
import { useRef, useState } from 'react';
import Image from 'next/image';
import ModalImageUpload from '@/src/components/modal/modal-image-upload';
import { createPost, createReply } from '@/app/actions/post';
import ActionButton from './action-button';

type WritePostProps = {
    variant: PostFormTypeVariant;
    user: User;
    messageVariant: MessageVariant;
};

export default function WritePost({ variant, user, messageVariant }: WritePostProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [image, setImage] = useState<string | null>(null);
    const imageRef = useRef<HTMLInputElement | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const createMessage = async (formData: FormData) => {
        let response = null;
        response = await createPost(formData);
        // TODO: Add Error handling
        if (response) {
            formRef.current?.reset();
            setImage(null);
        }
    };

    const formAction = async (formData: FormData) => {
        switch (messageVariant) {
            case MessageVariant.CREATE:
                return createMessage(formData);
            case MessageVariant.REPLY:
                return createReply.bind(formData, user.id);
            default:
                return null;
        }
    };

    return (
        <form ref={formRef} action={formAction} className="flex flex-col gap-y-s">
            {variant === PostFormTypeVariant.MAINFIELD ? (
                <>
                    <Label className="pl-xxl md:pl-0" size={LabelSize.XL} htmlFor="text">
                        Hey, was gibt&apos;s Neues?
                    </Label>
                    {image && (
                        <>
                            <div className="w-fill relative mx-auto h-auto rounded-m bg-violet-50 p-xs">
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
                                    setImage(null);
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
            />
            <section className="flex flex-row justify-between gap-s">
                <ActionButton isOpen={isOpen} setIsOpen={setIsOpen} />
            </section>
            <input
                type="file"
                name="media"
                id="media"
                ref={imageRef}
                disabled={image ? false : true}
                hidden
            />
            <ModalImageUpload
                onChange={setImage}
                inputRef={imageRef}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </form>
    );
}
