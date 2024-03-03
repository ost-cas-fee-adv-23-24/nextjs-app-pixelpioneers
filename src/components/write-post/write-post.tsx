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

export default async function WritePost({ type }: { type: string }) {
    // TODO: We need to have the label size of 32px - 2xl
    return (
        <>
            {type === 'mainField' ? (
                <Label className="pl-xxl md:pl-0" size={LabelSize.XL} htmlFor="text">
                    Hey, was gibt&apos;s Neues?
                </Label>
            ) : (
                <span>Display Name Component</span>
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
