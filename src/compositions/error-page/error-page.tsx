'use client';

import {
    Button,
    ButtonSize,
    Heading,
    HeadingLevel,
    IconCancel,
    IconMumble,
    IconProps,
    IconSize,
    Paragraph,
    ParagraphSize,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';
import { ComponentType } from 'react';

type ErrorPageProps = {
    errorTitle?: string;
    errorMessage: string;
    buttonLabel?: string;
    onButtonClick?: () => void;
    buttonIcon?: ComponentType<IconProps>;
    fullPage?: boolean;
};
export default function ErrorPage({
    errorTitle,
    errorMessage,
    buttonLabel,
    onButtonClick,
    buttonIcon,
    fullPage = true,
}: ErrorPageProps) {
    return (
        <section className="flex flex-col items-center gap-s">
            <IconCancel size={IconSize.L} className="fill-tertiary-600" />
            {fullPage && (
                <Heading
                    variant={HeadingLevel.H1}
                    className="max-w-2xl bg-gradient-to-r from-tertiary-500 to-primary-500 bg-clip-text text-center text-transparent"
                >
                    Oh nein! Da ist wohl etwas schief gelaufen...
                </Heading>
            )}
            <div className="flex flex-col items-center gap-xs">
                {errorTitle && (
                    <Paragraph className="text-secondary-600" size={ParagraphSize.M}>
                        {errorTitle}
                    </Paragraph>
                )}
                <Paragraph className="text-secondary-600" size={ParagraphSize.M}>
                    {errorMessage}
                </Paragraph>
            </div>
            {fullPage && (
                <div className="mt-2xl">
                    <Button
                        Icon={buttonIcon || IconMumble}
                        size={ButtonSize.L}
                        label={buttonLabel}
                        variant={Variant.SECONDARY}
                        onClick={onButtonClick}
                    />
                </div>
            )}
        </section>
    );
}
