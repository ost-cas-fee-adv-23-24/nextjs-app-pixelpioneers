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
                    title={'Über mich'}
                >
                    {/* TODO: set different text */}
                    Ostschweizer mit Leidenschaft für Fussball, designaffin, nie ohne Bart,
                    Weinliebhaber, leichte Tendenz zu Football Manager-Sucht, kocht gerne indisch,
                    baut seit neustem Duplotürme und Brio-Bahnanlagen.
                </Paragraph>
            </section>
        </section>
    );
}
