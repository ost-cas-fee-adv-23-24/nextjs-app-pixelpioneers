// TODO: Need to sync with team member

import { ActionError } from '@/src/models/error.model';
import { StatusCodes } from 'http-status-codes';

export async function request<T>(
    endpoint: string,
    options: { [key: string]: string | FormData },
    jwtToken?: string,
    tags?: string[],
    revalidate?: number,
): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;
    const headers: { [key: string]: string } = {
        'content-type': 'application/json',
        Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
    };

    if (options.body && typeof options.body !== 'string') {
        delete headers['content-type'];
    }

    const response = await fetch(url, {
        headers,
        ...options,
        next: { tags, revalidate },
    }).catch((error) => {
        console.error('Error during request', error);
    });

    if (!response) {
        throw new ActionError('request', 'request failed, check your internet connection');
    }
    if (!response?.ok) {
        throw new ActionError('request', `${response?.status}`);
    }
    if (response.status === StatusCodes.NO_CONTENT) {
        // if no content is given with the succeeded request, return undefined
        // TODO: ask if it makes sense to return undefined as T
        return undefined as T;
    }
    return (await response.json()) as T;
}
