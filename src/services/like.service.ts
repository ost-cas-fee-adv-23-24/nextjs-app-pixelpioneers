import { TokenModel } from '../models/token.model';
import { qwackerRequest } from './qwacker.service';

export function updateLike({ token, id }: TokenModel) {
    return qwackerRequest(`posts/${id}/likes`, token, {
        method: 'PUT',
    });
}

export function removeLike({ token, id }: TokenModel) {
    return qwackerRequest(`posts/${id}/likes`, token, {
        method: 'DELETE',
    });
}
