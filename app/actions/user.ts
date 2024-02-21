'use server';

import { User } from '@/src/models/user.model';
import { request } from '@/src/services/request.service';
import { API_ROUTES, getRoute } from '@/src/helpers/routes';
import { getSession } from '@/app/actions/utils';

export async function getUser(userId: string): Promise<User> {
    const session = await getSession();
    return await request<User>(
        getRoute(API_ROUTES.USERS_ID, userId),
        {
            method: 'GET',
        },
        session.accessToken,
    );
}
