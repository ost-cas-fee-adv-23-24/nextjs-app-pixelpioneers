import { Session } from 'next-auth';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { redirect } from 'next/navigation';
import { APP_ROUTES, getRoute } from '@/src/helpers/routes';

export async function getSession(): Promise<Session> {
    const session = await auth();
    if (session === null || session.accessToken === undefined) {
        // TODO: redirect or throw error?
        redirect(getRoute(APP_ROUTES.LOGIN));
        //throw new ActionError('login', 'session outdated');
    }
    return session;
}
