import { createPost } from '@/mumble/api';

export default function NewPost() {
    async function createNewPost(data: FormData) {
        'use server';

        if (!data.has('text')) {
            // eslint-disable-next-line no-console
            console.log('No text or access token');
            return;
        }

        const text = data.get('text') as string;
        await createPost(text);
    }

    return (
        <form action={createNewPost}>
            <div>
                <label htmlFor="text">Text</label>
            </div>
            <div>
                <textarea name="text" id="text" placeholder="text"></textarea>
            </div>
            <button
                type="submit"
                className="rounded bg-green-500 px-4 py-2 hover:bg-blue-700 font-bold text-white"
            >
                Create
            </button>
        </form>
    );
}
