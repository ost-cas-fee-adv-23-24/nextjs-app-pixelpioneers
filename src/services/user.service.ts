import { request } from './request.service';

export function getUser(token: string, id: string) {
    return request(`users/${id}`, token, { method: 'GET' });
}
