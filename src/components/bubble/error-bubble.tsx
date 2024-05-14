import {
    IconCancel,
    Paragraph,
    ParagraphSize,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

type ErrorBubbleProps = {
    message: string;
    onClick: () => void;
};

export function ErrorBubble({ message, onClick }: ErrorBubbleProps) {
    return (
        <div className="fixed top-2xl z-50 flex w-screen justify-center md:top-7xl md:w-container">
            <button
                onClick={onClick}
                className="shadow-xls flex flex-row gap-xs rounded-[20px] bg-error px-m py-xs text-secondary-100 opacity-95"
            >
                <IconCancel className="self-center fill-white" />
                <Paragraph size={ParagraphSize.M}>{message}</Paragraph>
            </button>
        </div>
    );
}
