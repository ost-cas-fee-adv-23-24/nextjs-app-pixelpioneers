import { createPost } from '@/app/actions/post';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import {
    Avatar,
    AvatarSize,
    Button,
    ButtonSize,
    IconSend,
    IconUpload,
    Label,
    LabelSize,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

export default async function NewPost() {
    const session = await auth();
    // TODO: We need to have the label size of 32px - 2xl
    return (
        <form
            className="relative my-m flex flex-col gap-y-s rounded-m bg-white px-xl py-l md:min-h-[326px] md:w-[680px]"
            action={createPost}
        >
            <div className="z-5 absolute left-[32px] top-[-20px] md:left-[-32px] md:top-[20px]">
                <Avatar
                    size={AvatarSize.M}
                    src={session?.user?.image || ''}
                    alt={session?.user?.name || ''}
                />
            </div>

            <Label className="pl-xxl md:pl-0" size={LabelSize.XL} htmlFor="text">
                Hey, was gibt&apos;s Neues?
            </Label>
            <textarea
                className="h-15xl resize-none rounded-m border-2 border-secondary-200 bg-secondary-50 p-m"
                name="text"
                id="text"
                placeholder="Deine Meinung zählt!"
            ></textarea>
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
        </form>
    );
}
