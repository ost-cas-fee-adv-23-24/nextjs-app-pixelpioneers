'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function reloadPathData(path: string, type?: 'layout' | 'page'): Promise<void> {
    revalidatePath(path, type);
}

// TODO: use or remove
export async function reloadTagData(tag: string): Promise<void> {
    revalidateTag(tag);
}
