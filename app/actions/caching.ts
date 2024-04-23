'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function reloadPathData(path: string, type?: 'layout' | 'page'): Promise<void> {
    revalidatePath(path, type);
}

export async function reloadTagData(tag: string): Promise<void> {
    revalidateTag(tag);
}
