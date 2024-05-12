'use client';

import {
    AvatarSize,
    Heading,
    HeadingLevel,
    IconCheckmark,
    Label,
    LabelSize,
    Paragraph,
    ParagraphSize,
    Textarea,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { MessageVariant } from '@/src/compositions/message/types';
import { User } from '@/src/models/user.model';
import DisplayName from '@/src/compositions/display-name/display-name';
import { DisplayNameVariant } from '@/src/compositions/display-name/types';
import MessageFormActions from '@/src/components/message-form/message-form-actions';
import ModalImageUpload from '@/src/components/modal/modal-image-upload';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { Message } from '@/src/models/message.model';
import { ActionResponse, ErrorType, getErrorMessage } from '@/src/models/action.model';
import Avatar from '../avatar/avatar';
import { APP_ROUTES, getRoute } from '@/src/services/route.service';
import Link from 'next/link';

type MessageFormProps = {
    user?: User;
    messageVariant: MessageVariant;
    onCreate: (formData: FormData) => Promise<ActionResponse<Message>>;
};
export default function MessageForm({ user, messageVariant, onCreate }: MessageFormProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [image, setImage] = useState<string | null>(null);
    const [error, setError] = useState<ErrorType>();

    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const isPost = messageVariant === MessageVariant.POST;

    const onSend = async (formData: FormData) => {
        const createResponse = await onCreate(formData);
        if (createResponse.isError) {
            setError(createResponse.error);
        }
        formRef.current?.reset();
        setImage(null);
    };

    return (
        <section
            className={clsx(
                isPost
                    ? 'relative flex flex-col gap-y-s bg-white px-m py-s md:min-h-[326px] md:w-container md:rounded-m md:px-xl md:py-l'
                    : 'mt-s md:mt-l',
            )}
        >
            <form ref={formRef} action={onSend} className="flex flex-col gap-y-s">
                {user ? (
                    <>
                        {isPost ? (
                            <div className="flex flex-row gap-s">
                                <div className="md:z-5 md:absolute md:left-[-32px] md:top-[20px]">
                                    <Link href={getRoute(APP_ROUTES.USER, user.id)}>
                                        <Avatar
                                            desktopSize={AvatarSize.M}
                                            mobileSize={AvatarSize.S}
                                            avatarUrl={user.avatarUrl}
                                            username={user.username}
                                        />
                                    </Link>
                                </div>
                                <Label
                                    className="self-center text-secondary-900"
                                    size={LabelSize.XL}
                                    htmlFor="text"
                                >
                                    {`Hey, was gibt's Neues?`}
                                </Label>
                            </div>
                        ) : (
                            <DisplayName variant={DisplayNameVariant.REPLY} user={user} />
                        )}
                    </>
                ) : (
                    <div>
                        <Heading className="text-secondary-600" variant={HeadingLevel.H3}>
                            Voll leer hier! 😲
                        </Heading>
                        <Paragraph className="text-secondary-600" size={ParagraphSize.M}>
                            Verfasse deinen ersten Mumble oder folge anderen Usern!
                        </Paragraph>
                    </div>
                )}

                <Textarea
                    ref={textAreaRef}
                    className="h-15xl resize-none rounded-m border-2 border-secondary-200 bg-secondary-50 p-m"
                    name="text"
                    id="text"
                    placeholder={isPost ? 'Deine Meinung zählt!' : 'Und was meinst du dazu?'}
                    aria-label={`write text for ${isPost ? 'post' : 'reply'}`}
                    autoFocus
                />
                {error && (
                    <Label size={LabelSize.S} className="text-error">
                        {getErrorMessage(error)}
                    </Label>
                )}
                <section className="flex flex-row justify-between gap-s">
                    <MessageFormActions
                        onUpload={() => {
                            setIsOpen(!isOpen);
                        }}
                    />
                </section>
                {image && (
                    <div className="flex flex-row items-center gap-xs">
                        <IconCheckmark className="fill-primary-600" />
                        <Label size={LabelSize.S} className="text-primary-600">
                            Bild hochgeladen
                        </Label>
                    </div>
                )}
                <input
                    type="file"
                    name="media"
                    id="media"
                    ref={imageInputRef}
                    disabled={!image}
                    hidden
                />
                <ModalImageUpload
                    onChange={setImage}
                    inputRef={imageInputRef}
                    isOpen={isOpen}
                    onSubmit={() => setIsOpen(false)}
                    onCancel={() => setIsOpen(false)}
                    maxFileUploadSizeBytes={2097152}
                    fileSizeLabel="JPEG oder PNG, maximal 2 MB"
                />
            </form>
        </section>
    );
}
