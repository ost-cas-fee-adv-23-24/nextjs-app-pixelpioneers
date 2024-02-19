// TODO: Need to sync with team member

import { ActionError } from '@/src/models/fetch.model';

export async function request<T>(
    endpoint: string,
    options: { [key: string]: string | FormData },
    jwtToken?: string,
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
    }).catch((error) => {
        console.error('Error during request', error);
    });

    if (!response) {
        throw new ActionError({ request: 'request failed, check your internet connection' });
    }
    if (!response?.ok) {
        throw new ActionError({ request: `${response?.status}: ${response?.json}` });
    }
    if (response.status === 204) {
        // if no content is given with the succeeded request, return undefined
        return undefined as T;
    }
    return (await response.json()) as T;
}
