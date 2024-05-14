'use server';

import { revalidatePath } from 'next/cache';

export async function reloadPathData(path: string, type?: 'layout' | 'page'): Promise<void> {
    revalidatePath(path, type);
}
