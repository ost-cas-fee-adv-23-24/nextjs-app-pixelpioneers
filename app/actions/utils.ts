import { Session } from 'next-auth';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { redirectToLogin } from '@/src/helpers/checkLogin';
import { ActionError } from '@/src/models/error.model';

export async function getSession(): Promise<Session> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        redirectToLogin();
        throw new ActionError('login', 'session outdated');
    }
    return session;
}
