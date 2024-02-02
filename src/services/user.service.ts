import { TokenModel } from '../models/token.model';
import { qwackerRequest } from './qwacker.service';

export function getUser({ token, id }: TokenModel) {
    return qwackerRequest(`users/${id}`, token, { method: 'GET' });
}
