import {
    Button,
    ButtonSize,
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

export default async function WritePost({ type }: { type: PostFormTypeVariant }) {
    // TODO: We need to have the label size of 32px - 2xl
    return (
        <>
            {type === PostFormTypeVariant.MAINFIELD ? (
                <Label className="pl-xxl md:pl-0" size={LabelSize.XL} htmlFor="text">
                    Hey, was gibt&apos;s Neues?
                </Label>
            ) : (
                <DisplayName
                    variant={DisplayNameVariant.REPLY}
                    user={{
                        id: '179944860378202369',
                        username: 'max_muster',
                        avatarUrl: 'string',
                        firstName: 'Nachname',
                        lastName: 'Vorname',
                    }}
                />
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
        </>
    );
}
