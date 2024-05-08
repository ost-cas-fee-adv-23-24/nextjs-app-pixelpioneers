'use client';

import ImageHeader from '@/src/components/image-header/image-header';
import DisplayName from '@/src/compositions/display-name/display-name';
import { DisplayNameVariant } from '@/src/compositions/display-name/types';
import { User } from '@/src/models/user.model';
import { Paragraph, ParagraphSize } from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import React from 'react';

type ProfileHeaderProps = {
    user: User;
    isActiveUser?: boolean;
};
export default function ProfileHeader({ user, isActiveUser = false }: ProfileHeaderProps) {
    return (
        <>
            <section className="flex flex-col gap-m">
                <ImageHeader user={user} isActiveUser={isActiveUser} />
                <section className="mx-m flex flex-col gap-base md:mx-0 md:w-container">
                    <DisplayName
                        user={user}
                        variant={DisplayNameVariant.PROFILE}
                        isActiveUser={isActiveUser}
                    />
                    <Paragraph
                        className="w-fill text-slate-400"
                        size={ParagraphSize.M}
                        title={`Über ${user.username}`}
                    >
                        Willkommen auf {user.username}s Seite! Hätte er oder sie eine Bio verfasst,
                        könntest du diese hier lesen.
                    </Paragraph>
                </section>
            </section>
            {/*<ModalImageUpload
                onChange={() => console.log('e')}
                inputRef={undefined}
                isOpen={true}
                onSubmit={() => console.log('e')}
                onCancel={() => console.log('e')}
            />*/}
        </>
    );
}
