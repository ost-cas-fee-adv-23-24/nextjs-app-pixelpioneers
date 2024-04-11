import { StatusCodes } from 'http-status-codes';

export async function request(
    endpoint: string,
    options: { [key: string]: string | FormData },
    jwtToken?: string,
    tags?: string[],
    revalidate?: number,
): Promise<object | undefined> {
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
        // TODO: do we need cache: 'force-cache', ?
    }).catch((error) => {
        console.error('Error during request', error);
    });

    if (!response) {
        throw new Error(
            `${StatusCodes.BAD_REQUEST} - request failed, check your internet connection`,
        );
    }
    if (!response?.ok) {
        throw new Error(`${response?.status || StatusCodes.BAD_REQUEST} - ${response?.statusText}`);
    }
    if (response.status === StatusCodes.NO_CONTENT) {
        // if no content is given with the succeeded request, return undefined
        return undefined;
    }
    return await response.json();
}
