type InfoBubbleProps = {
    message: string;
    onClick: () => void;
};

export function InfoBubble({ message, onClick }: InfoBubbleProps) {
    return (
        <div className="fixed top-l z-50 flex w-[680px] justify-center">
            <button
                className="rounded-[20px] bg-secondary-800 px-m py-xs text-secondary-200"
                onClick={onClick}
            >
                {message}
            </button>
        </div>
    );
}
