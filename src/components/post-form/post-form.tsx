'use client';

import {
    Avatar,
    AvatarSize,
    Button,
    ButtonSize,
    IconCancel,
    Label,
    LabelSize,
    Textarea,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { MessageVariant } from '../../compositions/post/types';
import { User } from '@/src/models/user.model';
import Image from 'next/image';
import DisplayName from '@/src/compositions/display-name/display-name';
import { DisplayNameVariant } from '@/src/compositions/display-name/types';
import ActionButton from '@/src/compositions/write-post/action-button';
import ModalImageUpload from '@/src/components/modal/modal-image-upload';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { Message } from '@/src/models/post.model';
import { ActionResponse } from '@/src/models/action.model';

export default function PostForm({
    user,
    messageVariant,
    onCreate,
}: {
    user: User;
    messageVariant: MessageVariant;
    onCreate: (formData: FormData) => Promise<ActionResponse<Message>>;
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [image, setImage] = useState<string | null>(null);
    const imageRef = useRef<HTMLInputElement | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const isPost = messageVariant === MessageVariant.POST;

    // TODO: try with https://blog.openreplay.com/server-actions-in-nextjs/

    const formAction = async (formData: FormData) => {
        const createResponse = await onCreate(formData);
        if (createResponse.isError) {
            // TODO: show errors
        }
        formRef.current?.reset();
        setImage(null);
    };

    return (
        <section
            className={clsx(
                isPost
                    ? 'relative flex flex-col gap-y-s bg-white px-m py-s md:min-h-[326px] md:w-[680px] md:rounded-m md:px-xl md:py-l'
                    : 'mt-s md:mt-l',
            )}
        >
            <form ref={formRef} action={formAction} className="flex flex-col gap-y-s">
                {isPost ? (
                    <div className="flex flex-row gap-s">
                        <div className="md:z-5 md:absolute md:left-[-32px] md:top-[20px]">
                            <Avatar
                                // TODO: make size S on mobile
                                size={AvatarSize.M}
                                src={user.avatarUrl || ''}
                                alt={user.username}
                            />
                        </div>
                        <Label className="self-center" size={LabelSize.XL} htmlFor="text">
                            {`Hey, was gibt's Neues?`}
                        </Label>
                    </div>
                ) : (
                    <DisplayName variant={DisplayNameVariant.REPLY} user={user} />
                )}
                {image && (
                    <>
                        <div className="w-fill relative mx-auto h-auto rounded-m bg-violet-50 p-xs">
                            <Image
                                src={image}
                                alt="Bildvorschau"
                                className="mx-auto rounded-m"
                                quality={75}
                                width={300}
                                height={200}
                                loading="eager"
                                priority
                                aria-label="Bildvorschau"
                                sizes="(max-width: 300px) 100vw"
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
                            label="Bild löschen"
                        />
                    </>
                )}
                <Textarea
                    className="h-15xl resize-none rounded-m border-2 border-secondary-200 bg-secondary-50 p-m"
                    name="text"
                    // TODO: remove text when something is posted
                    id="text"
                    placeholder={isPost ? 'Deine Meinung zählt!' : 'Und was meinst du dazu?'}
                />
                <section className="flex flex-row justify-between gap-s">
                    <ActionButton
                        onUpload={() => {
                            setIsOpen(!isOpen);
                        }}
                    />
                </section>
                <input
                    type="file"
                    name="media"
                    id="media"
                    ref={imageRef}
                    disabled={!image}
                    hidden
                />
                <ModalImageUpload
                    onChange={setImage}
                    inputRef={imageRef}
                    isOpen={isOpen}
                    onSubmit={() => setIsOpen(false)}
                    onCancel={() => setIsOpen(false)}
                />
            </form>
        </section>
    );
}
