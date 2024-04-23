type ActionBubbleProps = {
    message: string;
    onClick: () => Promise<void>;
};

export function ActionBubble({ message, onClick }: ActionBubbleProps) {
    return (
        <form action={onClick} className="fixed top-l z-50 flex w-[680px] justify-center">
            <button
                className="rounded-[20px] bg-secondary-800 px-m py-xs text-secondary-200"
                type="submit"
            >
                {message}
            </button>
        </form>
    );
}
