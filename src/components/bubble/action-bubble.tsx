import {
    IconSend,
    Paragraph,
    ParagraphSize,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

type ActionBubbleProps = {
    message: string;
    onClick: () => Promise<void>;
};

export function ActionBubble({ message, onClick }: ActionBubbleProps) {
    return (
        <form
            action={onClick}
            className="fixed top-2xl z-50 flex w-screen justify-center md:top-7xl md:w-container"
        >
            <button
                className="shadow-xls flex flex-row gap-xs rounded-[20px] bg-secondary-800 px-m py-xs text-secondary-100 opacity-95"
                type="submit"
            >
                <IconSend className="self-center fill-white" />
                <Paragraph size={ParagraphSize.M}>{message}</Paragraph>
            </button>
        </form>
    );
}
