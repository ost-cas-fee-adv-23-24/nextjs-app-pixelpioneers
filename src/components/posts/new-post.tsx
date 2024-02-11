import { createPost } from '@/app/actions';

export default function NewPost() {
    return (
        <form action={createPost}>
            <div>
                <label htmlFor="text">Text</label>
            </div>
            <div>
                <textarea name="text" id="text" placeholder="text"></textarea>
            </div>
            <button type="submit" className="rounded px-4 py-2 hover:bg-blue-700 font-bold">
                Create
            </button>
        </form>
    );
}
