import { createPost } from '@/app/actions';
import {
    Avatar,
    AvatarSize,
    Button,
    ButtonSize,
    IconSend,
    IconUpload,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

export default function NewPost() {
    return (
        <form
            className="relative my-m flex flex-col gap-y-m rounded-m bg-white p-l md:min-h-[200px] md:w-[680px]"
            action={createPost}
        >
            <div className="z-5 absolute left-[-20px] top-[20px]">
                <Avatar size={AvatarSize.S} alt="George Michael" />
            </div>
            <label htmlFor="text">Hey, was gibt&apos;s Neues?</label>
            <textarea
                className="resize-none rounded-m border-2 border-secondary-200 bg-secondary-50 p-m"
                name="text"
                id="text"
                placeholder="Deine Meinung zählt!"
            ></textarea>
            <section className="flex flex-row justify-between ">
                <Button
                    type="button"
                    Icon={IconUpload}
                    size={ButtonSize.M}
                    variant={Variant.SECONDARY}
                    label="Bild hochladen"
                />
                <Button
                    type="submit"
                    Icon={IconSend}
                    size={ButtonSize.M}
                    variant={Variant.PRIMARY}
                    label="Absenden"
                />
            </section>
        </form>
    );
}
