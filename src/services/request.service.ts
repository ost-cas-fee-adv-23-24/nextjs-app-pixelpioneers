// TODO: Need to sync with team member
import { Response } from '@/src/models/fetch.model';

export async function request<T>(
    endpoint: string,
    options: { [key: string]: string | FormData },
    jwtToken?: string,
): Promise<Response<T>> {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;
    const headers: { [key: string]: string } = {
        'content-type': 'application/json',
        Authorization: jwtToken ? `Bearer ${jwtToken}` : '',
    };

    if (options.body && typeof options.body !== 'string') {
        delete headers['content-type'];
    }

    try {
        const response = await fetch(url, {
            headers,
            ...options,
        }).catch((error) => {
            console.error('Error during request', error);
        });

        if (!response || !response?.ok) {
            console.error(`Error ${response?.status}: ${response?.json}`);
            return { error: { request: `${response?.status}: ${response?.json}` } };
        }
        return { data: response.json() as T };
    } catch (error) {
        return { error: { request: 'request failed, check your internet connection' } };
    }
}
